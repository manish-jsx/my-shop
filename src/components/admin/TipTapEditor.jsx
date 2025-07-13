// src/components/admin/TipTapEditor.jsx
'use client'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { TextStyle } from '@tiptap/extension-text-style'
import { FontFamily } from '@tiptap/extension-font-family'
import { Color } from '@tiptap/extension-color'
import { Highlight } from '@tiptap/extension-highlight'
import { TextAlign } from '@tiptap/extension-text-align'
import { Link } from '@tiptap/extension-link'
import { Image } from '@tiptap/extension-image'
import { CodeBlockLowlight } from '@tiptap/extension-code-block-lowlight'
import { createLowlight } from 'lowlight'
import javascript from 'highlight.js/lib/languages/javascript'
import typescript from 'highlight.js/lib/languages/typescript'
import html from 'highlight.js/lib/languages/xml'
import css from 'highlight.js/lib/languages/css'
import python from 'highlight.js/lib/languages/python'
import json from 'highlight.js/lib/languages/json'
import { Button, ButtonGroup, Input, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from '@nextui-org/react'
import { useState, useEffect } from 'react'
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Code,
  Quote,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Link as LinkIcon,
  Image as ImageIcon,
  Undo,
  Redo,
  Palette,
  Highlighter,
  Type,
  Heading1,
  Heading2,
  Heading3,
  Minus
} from 'lucide-react'

// Create lowlight instance
const lowlight = createLowlight()

// Register common languages
lowlight.register('javascript', javascript)
lowlight.register('typescript', typescript)
lowlight.register('html', html)
lowlight.register('css', css)
lowlight.register('python', python)
lowlight.register('json', json)

const TipTapEditor = ({ content, onChange, placeholder = "Start writing..." }) => {
  const [linkUrl, setLinkUrl] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [imageAlt, setImageAlt] = useState('')
  const [textColor, setTextColor] = useState('#000000')
  const [highlightColor, setHighlightColor] = useState('#ffff00')
  const [isMounted, setIsMounted] = useState(false)
  
  const { isOpen: isLinkModalOpen, onOpen: onLinkModalOpen, onClose: onLinkModalClose } = useDisclosure()
  const { isOpen: isImageModalOpen, onOpen: onImageModalOpen, onClose: onImageModalClose } = useDisclosure()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false, // We'll use CodeBlockLowlight instead
      }),
      TextStyle,
      FontFamily,
      Color,
      Highlight.configure({
        multicolor: true,
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-600 hover:text-blue-800 underline',
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'max-w-full h-auto rounded-lg',
        },
      }),
      CodeBlockLowlight.configure({
        lowlight,
        HTMLAttributes: {
          class: 'bg-gray-100 p-4 rounded-lg border text-sm font-mono',
        },
      }),
    ],
    content: content,
    immediatelyRender: false, // Fix SSR hydration issues
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose-base lg:prose-lg xl:prose-xl mx-auto focus:outline-none min-h-[400px] p-4',
        'data-placeholder': placeholder,
      },
    },
  })

  if (!editor || !isMounted) {
    return (
      <div className="border border-gray-300 rounded-lg overflow-hidden">
        <div className="border-b border-gray-300 p-3 bg-gray-50">
          <div className="flex gap-2">
            <div className="w-8 h-8 bg-gray-200 rounded animate-pulse"></div>
            <div className="w-8 h-8 bg-gray-200 rounded animate-pulse"></div>
            <div className="w-8 h-8 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
        <div className="min-h-[400px] bg-white flex items-center justify-center">
          <div className="text-gray-500">Loading editor...</div>
        </div>
      </div>
    )
  }

  const addLink = () => {
    if (linkUrl) {
      editor.chain().focus().setLink({ href: linkUrl }).run()
      setLinkUrl('')
      onLinkModalClose()
    }
  }

  const addImage = () => {
    if (imageUrl) {
      editor.chain().focus().setImage({ src: imageUrl, alt: imageAlt }).run()
      setImageUrl('')
      setImageAlt('')
      onImageModalClose()
    }
  }

  const ToolbarButton = ({ onClick, isActive = false, disabled = false, children }) => (
    <Button
      size="sm"
      variant={isActive ? "solid" : "flat"}
      color={isActive ? "primary" : "default"}
      onPress={onClick}
      isDisabled={disabled}
      className="min-w-unit-8 w-8 h-8 p-0"
    >
      {children}
    </Button>
  )

  const ColorPicker = ({ color, onChange, label }) => (
    <div className="flex items-center gap-2">
      <span className="text-xs">{label}:</span>
      <input
        type="color"
        value={color}
        onChange={(e) => onChange(e.target.value)}
        className="w-6 h-6 border border-gray-300 rounded cursor-pointer"
      />
    </div>
  )

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div className="border-b border-gray-300 p-3 bg-gray-50 flex flex-wrap gap-2">
        {/* Text Formatting */}
        <ButtonGroup size="sm">
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            isActive={editor.isActive('bold')}
          >
            <Bold className="w-3 h-3" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            isActive={editor.isActive('italic')}
          >
            <Italic className="w-3 h-3" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleStrike().run()}
            isActive={editor.isActive('strike')}
          >
            <Strikethrough className="w-3 h-3" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleCode().run()}
            isActive={editor.isActive('code')}
          >
            <Code className="w-3 h-3" />
          </ToolbarButton>
        </ButtonGroup>

        {/* Headings */}
        <ButtonGroup size="sm">
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            isActive={editor.isActive('heading', { level: 1 })}
          >
            <Heading1 className="w-3 h-3" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            isActive={editor.isActive('heading', { level: 2 })}
          >
            <Heading2 className="w-3 h-3" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            isActive={editor.isActive('heading', { level: 3 })}
          >
            <Heading3 className="w-3 h-3" />
          </ToolbarButton>
        </ButtonGroup>

        {/* Lists */}
        <ButtonGroup size="sm">
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            isActive={editor.isActive('bulletList')}
          >
            <List className="w-3 h-3" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            isActive={editor.isActive('orderedList')}
          >
            <ListOrdered className="w-3 h-3" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            isActive={editor.isActive('blockquote')}
          >
            <Quote className="w-3 h-3" />
          </ToolbarButton>
        </ButtonGroup>

        {/* Alignment */}
        <ButtonGroup size="sm">
          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
            isActive={editor.isActive({ textAlign: 'left' })}
          >
            <AlignLeft className="w-3 h-3" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
            isActive={editor.isActive({ textAlign: 'center' })}
          >
            <AlignCenter className="w-3 h-3" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
            isActive={editor.isActive({ textAlign: 'right' })}
          >
            <AlignRight className="w-3 h-3" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign('justify').run()}
            isActive={editor.isActive({ textAlign: 'justify' })}
          >
            <AlignJustify className="w-3 h-3" />
          </ToolbarButton>
        </ButtonGroup>

        {/* Colors */}
        <div className="flex items-center gap-2">
          <ColorPicker 
            color={textColor} 
            onChange={(color) => {
              setTextColor(color)
              editor.chain().focus().setColor(color).run()
            }}
            label="Text"
          />
          <ColorPicker 
            color={highlightColor} 
            onChange={(color) => {
              setHighlightColor(color)
              editor.chain().focus().setHighlight({ color }).run()
            }}
            label="Highlight"
          />
        </div>

        {/* Insert Elements */}
        <ButtonGroup size="sm">
          <ToolbarButton onClick={onLinkModalOpen}>
            <LinkIcon className="w-3 h-3" />
          </ToolbarButton>
          <ToolbarButton onClick={onImageModalOpen}>
            <ImageIcon className="w-3 h-3" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            isActive={editor.isActive('codeBlock')}
          >
            <Code className="w-3 h-3" />
          </ToolbarButton>
        </ButtonGroup>

        {/* Undo/Redo */}
        <ButtonGroup size="sm">
          <ToolbarButton
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
          >
            <Undo className="w-3 h-3" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
          >
            <Redo className="w-3 h-3" />
          </ToolbarButton>
        </ButtonGroup>

        {/* Divider */}
        <ToolbarButton onClick={() => editor.chain().focus().setHorizontalRule().run()}>
          <Minus className="w-3 h-3" />
        </ToolbarButton>
      </div>

      {/* Editor */}
      <div className="min-h-[400px] bg-white">
        <EditorContent editor={editor} />
      </div>

      {/* Link Modal */}
      <Modal isOpen={isLinkModalOpen} onClose={onLinkModalClose} size="md">
        <ModalContent>
          <ModalHeader>Add Link</ModalHeader>
          <ModalBody>
            <Input
              label="URL"
              placeholder="https://example.com"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              autoFocus
            />
          </ModalBody>
          <ModalFooter>
            <Button variant="flat" onPress={onLinkModalClose}>
              Cancel
            </Button>
            <Button color="primary" onPress={addLink}>
              Add Link
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Image Modal */}
      <Modal isOpen={isImageModalOpen} onClose={onImageModalClose} size="md">
        <ModalContent>
          <ModalHeader>Add Image</ModalHeader>
          <ModalBody className="space-y-4">
            <Input
              label="Image URL"
              placeholder="https://example.com/image.jpg"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              autoFocus
            />
            <Input
              label="Alt Text"
              placeholder="Description of the image"
              value={imageAlt}
              onChange={(e) => setImageAlt(e.target.value)}
            />
          </ModalBody>
          <ModalFooter>
            <Button variant="flat" onPress={onImageModalClose}>
              Cancel
            </Button>
            <Button color="primary" onPress={addImage}>
              Add Image
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}

export default TipTapEditor
