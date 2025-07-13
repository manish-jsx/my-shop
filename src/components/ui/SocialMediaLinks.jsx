// // src/components/ui/SocialMediaLinks.jsx
// 'use client'
// import { Button } from '@nextui-org/react'
// import { 
//   Instagram, 
//   Facebook, 
//   Youtube, 
//   Twitter, 
//   Linkedin,
//   Pinterest
// } from 'lucide-react'

// const socialLinks = [
//   {
//     name: 'Instagram',
//     icon: Instagram,
//     url: 'https://instagram.com/shukragems',
//     color: 'from-purple-400 to-pink-400',
//     handle: '@shukragems'
//   },
//   {
//     name: 'Facebook',
//     icon: Facebook,
//     url: 'https://facebook.com/shukragems',
//     color: 'from-blue-600 to-blue-700',
//     handle: 'SHUKRA Gems'
//   },
//   {
//     name: 'YouTube',
//     icon: Youtube,
//     url: 'https://youtube.com/shukragems',
//     color: 'from-red-500 to-red-600',
//     handle: 'SHUKRA Gems'
//   },
//   {
//     name: 'Twitter',
//     icon: Twitter,
//     url: 'https://twitter.com/shukragems',
//     color: 'from-blue-400 to-blue-500',
//     handle: '@shukragems'
//   },
//   {
//     name: 'Pinterest',
//     icon: Pinterest,
//     url: 'https://pinterest.com/shukragems',
//     color: 'from-red-600 to-red-700',
//     handle: 'SHUKRA Gems'
//   },
//   {
//     name: 'LinkedIn',
//     icon: Linkedin,
//     url: 'https://linkedin.com/company/shukragems',
//     color: 'from-blue-700 to-blue-800',
//     handle: 'SHUKRA Gems'
//   }
// ]

// export default function SocialMediaLinks({ 
//   variant = 'default', 
//   size = 'md', 
//   showLabels = false, 
//   productName = null 
// }) {
//   const handleSocialClick = (url, platform) => {
//     let finalUrl = url
    
//     // If sharing a product, customize the URL
//     if (variant === 'share' && productName) {
//       const shareText = `Check out this beautiful ${productName} from SHUKRA Gems!`
//       const shareUrl = window.location.href
      
//       switch (platform.toLowerCase()) {
//         case 'twitter':
//           finalUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`
//           break
//         case 'facebook':
//           finalUrl = `https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
//           break
//         case 'pinterest':
//           finalUrl = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(shareUrl)}&description=${encodeURIComponent(shareText)}`
//           break
//       }
//     }

//     // Track social media clicks for analytics
//     const socialData = {
//       platform,
//       timestamp: new Date().toISOString(),
//       source: 'social_click',
//       type: variant === 'share' ? 'product_share' : 'social_engagement',
//       productName: productName || null,
//       id: Date.now()
//     }

//     // Store click data
//     const existingLeads = JSON.parse(localStorage.getItem('leads') || '[]')
//     existingLeads.unshift(socialData)
//     localStorage.setItem('leads', JSON.stringify(existingLeads))

//     // Open social link
//     window.open(finalUrl, '_blank')
//   }

//   const getButtonSize = () => {
//     switch (size) {
//       case 'sm': return 'sm'
//       case 'lg': return 'lg'
//       default: return 'md'
//     }
//   }

//   const getIconSize = () => {
//     switch (size) {
//       case 'sm': return 'w-4 h-4'
//       case 'lg': return 'w-6 h-6'
//       default: return 'w-5 h-5'
//     }
//   }

//   if (variant === 'floating') {
//     return (
//       <div className="fixed right-4 top-1/2 -translate-y-1/2 z-40 space-y-2">
//         {socialLinks.slice(0, 4).map((social) => (
//           <Button
//             key={social.name}
//             isIconOnly
//             size={getButtonSize()}
//             className={`bg-gradient-to-r ${social.color} text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110`}
//             onPress={() => handleSocialClick(social.url, social.name)}
//             title={`Follow us on ${social.name}`}
//           >
//             <social.icon className={getIconSize()} />
//           </Button>
//         ))}
//       </div>
//     )
//   }

//   if (variant === 'footer') {
//     return (
//       <div className="space-y-4">
//         <h3 className="text-lg font-semibold">Follow Our Journey</h3>
//         <p className="text-sm text-gray-600">
//           See the latest gemstone discoveries, customer stories, and behind-the-scenes content.
//         </p>
//         <div className="flex flex-wrap gap-3">
//           {socialLinks.map((social) => (
//             <Button
//               key={social.name}
//               variant="flat"
//               size={getButtonSize()}
//               startContent={<social.icon className={getIconSize()} />}
//               onPress={() => handleSocialClick(social.url, social.name)}
//               className="text-gray-600 hover:text-gray-900"
//             >
//               {showLabels ? social.name : ''}
//             </Button>
//           ))}
//         </div>
//       </div>
//     )
//   }

//   if (variant === 'footer-bottom') {
//     return (
//       <div className="flex space-x-3">
//         {socialLinks.slice(0, 4).map((social) => (
//           <button
//             key={social.name}
//             onClick={() => handleSocialClick(social.url, social.name)}
//             className="p-2 bg-gray-800 rounded-full hover:bg-purple-600 transition-colors"
//             title={`Follow us on ${social.name}`}
//           >
//             <social.icon className="w-4 h-4 text-white" />
//           </button>
//         ))}
//       </div>
//     )
//   }

//   if (variant === 'share') {
//     const shareLinks = socialLinks.filter(link => 
//       ['Facebook', 'Twitter', 'Pinterest', 'LinkedIn'].includes(link.name)
//     )
    
//     return (
//       <div className="flex gap-2">
//         {shareLinks.map((social) => (
//           <Button
//             key={social.name}
//             variant="flat"
//             size={getButtonSize()}
//             startContent={<social.icon className={getIconSize()} />}
//             onPress={() => handleSocialClick(social.url, social.name)}
//             className="text-gray-600 hover:text-gray-900"
//           >
//             {showLabels ? `Share on ${social.name}` : ''}
//           </Button>
//         ))}
//       </div>
//     )
//   }

//   if (variant === 'contact') {
//     return (
//       <div className="space-y-2">
//         {socialLinks.map((social) => (
//           <div key={social.name} className="flex items-center gap-3">
//             <social.icon className="w-4 h-4 text-gray-400" />
//             <a
//               href={social.url}
//               target="_blank"
//               rel="noopener noreferrer"
//               onClick={() => handleSocialClick(social.url, social.name)}
//               className="text-gray-400 hover:text-white transition-colors text-sm"
//             >
//               {social.handle}
//             </a>
//           </div>
//         ))}
//       </div>
//     )
//   }

//   // Default variant
//   return (
//     <div className="flex flex-wrap gap-3">
//       {socialLinks.map((social) => (
//         <Button
//           key={social.name}
//           variant="flat"
//           size={getButtonSize()}
//           startContent={<social.icon className={getIconSize()} />}
//           onPress={() => handleSocialClick(social.url, social.name)}
//           className={`bg-gradient-to-r ${social.color} text-white hover:shadow-lg transition-all duration-300`}
//         >
//           {showLabels ? social.name : ''}
//         </Button>
//       ))}
//     </div>
//   )
// }

// export { socialLinks }
'use client';
import { Button } from '@nextui-org/react';
import {
  FaInstagram,
  FaFacebookF,
  FaYoutube,
  FaTwitter,
  FaPinterestP,
  FaLinkedinIn,
  FaTiktok,
  FaWhatsapp,
  FaTelegramPlane,
  FaDiscord,
  FaRedditAlien,
  FaSnapchatGhost,
  FaTumblr,
  FaMediumM
} from 'react-icons/fa';

const socialLinks = [
  {
    name: 'Instagram',
    icon: FaInstagram,
    url: 'https://instagram.com/shukragems',
    color: 'from-purple-400 to-pink-400',
    handle: '@shukragems',
    category: 'primary',
    description: 'Visual content, stories, reels',
    features: ['posts', 'stories', 'reels', 'igtv', 'shopping']
  },
  {
    name: 'Facebook',
    icon: FaFacebookF,
    url: 'https://facebook.com/shukragems',
    color: 'from-blue-600 to-blue-700',
    handle: 'SHUKRA Gems',
    category: 'primary',
    description: 'Community engagement, events',
    features: ['posts', 'events', 'groups', 'marketplace', 'ads']
  },
  {
    name: 'YouTube',
    icon: FaYoutube,
    url: 'https://youtube.com/shukragems',
    color: 'from-red-500 to-red-600',
    handle: 'SHUKRA Gems',
    category: 'primary',
    description: 'Educational videos, tutorials',
    features: ['videos', 'shorts', 'live', 'playlists', 'community']
  },
  {
    name: 'Twitter',
    icon: FaTwitter,
    url: 'https://twitter.com/shukragems',
    color: 'from-blue-400 to-blue-500',
    handle: '@shukragems',
    category: 'primary',
    description: 'News, updates, engagement',
    features: ['tweets', 'threads', 'spaces', 'fleets', 'ads']
  },
  {
    name: 'TikTok',
    icon: FaTiktok,
    url: 'https://tiktok.com/@shukragems',
    color: 'from-black to-gray-800',
    handle: '@shukragems',
    category: 'primary',
    description: 'Short videos, trends',
    features: ['videos', 'effects', 'duets', 'live', 'shopping']
  },
  {
    name: 'Pinterest',
    icon: FaPinterestP,
    url: 'https://pinterest.com/shukragems',
    color: 'from-red-600 to-red-700',
    handle: 'SHUKRA Gems',
    category: 'secondary',
    description: 'Product inspiration, boards',
    features: ['pins', 'boards', 'stories', 'shopping', 'ideas']
  },
  {
    name: 'LinkedIn',
    icon: FaLinkedinIn,
    url: 'https://linkedin.com/company/shukragems',
    color: 'from-blue-700 to-blue-800',
    handle: 'SHUKRA Gems',
    category: 'secondary',
    description: 'Professional network, B2B',
    features: ['posts', 'articles', 'events', 'company', 'ads']
  },
  {
    name: 'WhatsApp',
    icon: FaWhatsapp,
    url: 'https://wa.me/1234567890',
    color: 'from-green-400 to-green-600',
    handle: '+1 (234) 567-890',
    category: 'messaging',
    description: 'Direct customer support',
    features: ['business', 'catalog', 'status', 'broadcast', 'api']
  },
  {
    name: 'Telegram',
    icon: FaTelegramPlane,
    url: 'https://t.me/shukragems',
    color: 'from-blue-400 to-blue-600',
    handle: '@shukragems',
    category: 'messaging',
    description: 'Channel updates, community',
    features: ['channels', 'groups', 'bots', 'stories', 'calls']
  },
  {
    name: 'Discord',
    icon: FaDiscord,
    url: 'https://discord.gg/shukragems',
    color: 'from-indigo-500 to-purple-600',
    handle: 'SHUKRA Gems',
    category: 'community',
    description: 'Community discussions',
    features: ['servers', 'voice', 'video', 'threads', 'events']
  },
  {
    name: 'Reddit',
    icon: FaRedditAlien,
    url: 'https://reddit.com/r/shukragems',
    color: 'from-orange-500 to-red-600',
    handle: 'r/shukragems',
    category: 'community',
    description: 'Community discussions, AMA',
    features: ['posts', 'comments', 'communities', 'live', 'polls']
  },
  {
    name: 'Snapchat',
    icon: FaSnapchatGhost,
    url: 'https://snapchat.com/add/shukragems',
    color: 'from-yellow-400 to-yellow-500',
    handle: '@shukragems',
    category: 'emerging',
    description: 'Behind-the-scenes content',
    features: ['snaps', 'stories', 'spotlight', 'map', 'lenses']
  },
  {
    name: 'Tumblr',
    icon: FaTumblr,
    url: 'https://shukragems.tumblr.com',
    color: 'from-blue-800 to-indigo-900',
    handle: 'shukragems',
    category: 'emerging',
    description: 'Creative content, blog',
    features: ['posts', 'reblogs', 'asks', 'pages', 'themes']
  },
  {
    name: 'Medium',
    icon: FaMediumM,
    url: 'https://medium.com/@shukragems',
    color: 'from-green-600 to-green-700',
    handle: '@shukragems',
    category: 'content',
    description: 'Educational articles, stories',
    features: ['articles', 'publications', 'highlights', 'responses', 'series']
  }
];

export default function SocialMediaLinks({
  variant = 'default',
  size = 'md',
  showLabels = false,
  productName = null,
}) {
  const handleSocialClick = (url, platform) => {
    let finalUrl = url;
    if (variant === 'share' && productName) {
      const shareText = `Check out this beautiful ${productName} from SHUKRA Gems!`;
      const shareUrl = window.location.href;
      switch (platform.toLowerCase()) {
        case 'twitter':
          finalUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
            shareText
          )}&url=${encodeURIComponent(shareUrl)}`;
          break;
        case 'facebook':
          finalUrl = `https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            shareUrl
          )}`;
          break;
        case 'pinterest':
          finalUrl = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(
            shareUrl
          )}&description=${encodeURIComponent(shareText)}`;
          break;
        default:
          break;
      }
    }

    const socialData = {
      platform,
      timestamp: new Date().toISOString(),
      source: 'social_click',
      type: variant === 'share' ? 'product_share' : 'social_engagement',
      productName: productName || null,
      id: Date.now(),
    };
    const existingLeads = JSON.parse(localStorage.getItem('leads') || '[]');
    existingLeads.unshift(socialData);
    localStorage.setItem('leads', JSON.stringify(existingLeads));

    window.open(finalUrl, '_blank');
  };

  const getButtonSize = () => {
    switch (size) {
      case 'sm':
        return 'sm';
      case 'lg':
        return 'lg';
      default:
        return 'md';
    }
  };
  const getIconSize = () => {
    switch (size) {
      case 'sm':
        return 'w-4 h-4';
      case 'lg':
        return 'w-6 h-6';
      default:
        return 'w-5 h-5';
    }
  };

  // Render variants
  if (variant === 'floating') {
    return (
      <div className="fixed right-4 top-1/2 -translate-y-1/2 z-40 space-y-2">
        {socialLinks.slice(0, 4).map(social => (
          <Button
            key={social.name}
            isIconOnly
            size={getButtonSize()}
            className={`bg-gradient-to-r ${social.color} text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110`}
            onPress={() => handleSocialClick(social.url, social.name)}
            title={`Follow us on ${social.name}`}
          >
            <social.icon className={getIconSize()} />
          </Button>
        ))}
      </div>
    );
  }

  if (variant === 'footer') {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Follow Our Journey</h3>
        <p className="text-sm text-gray-600">
          See the latest gemstone discoveries, customer stories, and behind-the-scenes content.
        </p>
        <div className="flex flex-wrap gap-3">
          {socialLinks.map(social => (
            <Button
              key={social.name}
              variant="flat"
              size={getButtonSize()}
              startContent={<social.icon className={getIconSize()} />}
              onPress={() => handleSocialClick(social.url, social.name)}
              className="text-gray-600 hover:text-gray-900"
            >
              {showLabels ? social.name : ''}
            </Button>
          ))}
        </div>
      </div>
    );
  }

  if (variant === 'footer-bottom') {
    return (
      <div className="flex space-x-3">
        {socialLinks.slice(0, 4).map(social => (
          <button
            key={social.name}
            onClick={() => handleSocialClick(social.url, social.name)}
            className="p-2 bg-gray-800 rounded-full hover:bg-purple-600 transition-colors"
            title={`Follow us on ${social.name}`}
          >
            <social.icon className="w-4 h-4 text-white" />
          </button>
        ))}
      </div>
    );
  }

  if (variant === 'share') {
    const shareLinks = socialLinks.filter(link =>
      ['Facebook', 'Twitter', 'Pinterest', 'LinkedIn'].includes(link.name)
    );
    return (
      <div className="flex gap-2">
        {shareLinks.map(social => (
          <Button
            key={social.name}
            variant="flat"
            size={getButtonSize()}
            startContent={<social.icon className={getIconSize()} />}
            onPress={() => handleSocialClick(social.url, social.name)}
            className="text-gray-600 hover:text-gray-900"
          >
            {showLabels ? `Share on ${social.name}` : ''}
          </Button>
        ))}
      </div>
    );
  }

  if (variant === 'contact') {
    return (
      <div className="space-y-2">
        {socialLinks.map(social => (
          <div key={social.name} className="flex items-center gap-3">
            <social.icon className="w-4 h-4 text-gray-400" />
            <a
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleSocialClick(social.url, social.name)}
              className="text-gray-400 hover:text-white transition-colors text-sm"
            >
              {social.handle}
            </a>
          </div>
        ))}
      </div>
    );
  }

  // Default variant
  return (
    <div className="flex flex-wrap gap-3">
      {socialLinks.map(social => (
        <Button
          key={social.name}
          variant="flat"
          size={getButtonSize()}
          startContent={<social.icon className={getIconSize()} />}
          onPress={() => handleSocialClick(social.url, social.name)}
          className={`bg-gradient-to-r ${social.color} text-white hover:shadow-lg transition-all duration-300`}
        >
          {showLabels ? social.name : ''}
        </Button>
      ))}
    </div>
  );
}

export { socialLinks };
// src/components/ui/SocialMediaLinks.jsx
