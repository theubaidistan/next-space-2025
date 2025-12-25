import { NextResponse } from 'next/server';

// const posts = [
//   {
//     title: 'Lorem Ipsum',
//     slug: 'lorem-ipsum',
//     content:
//       'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero.',
//   },
//   {
//     title: 'Dolor Sit Amet',
//     slug: 'dolor-sit-amet',
//     content:
//       'Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet.',
//   },
//   {
//     title: 'Consectetur Adipiscing',
//     slug: 'consectetur-adipiscing',
//     content:
//       'Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta.',
//   },
//   {
//     title: 'Integer Nec Odio',
//     slug: 'integer-nec-odio',
//     content:
//       'Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent.',
//   },
//   {
//     title: 'Praesent Libero',
//     slug: 'praesent-libero',
//     content:
//       'Suspendisse in justo eu magna luctus suscipit. Sed lectus. Integer euismod lacus luctus magna.',
//   },
// ];

const posts = [
  {
    title: 'Customizable Profiles',
    slug: 'customizable-profiles',
    content:
      'Users can personalize their profiles with backgrounds, themes, and layouts to reflect their personality and style.',
  },
  {
    title: 'Friend Connections',
    slug: 'friend-connections',
    content:
      'Add and manage friends, see their updates, and interact with their posts to stay connected in your social network.',
  },
  {
    title: 'Audio & Media Sharing',
    slug: 'audio-media-sharing',
    content:
      'Upload and share audio tracks, videos, and photos directly on your profile for friends and followers to enjoy.',
  },
  {
    title: 'Blogging & Status Updates',
    slug: 'blogging-status-updates',
    content:
      'Create posts, write blogs, and share status updates to let your friends know what you are up to.',
  },
  {
    title: 'Comments & Messaging',
    slug: 'comments-messaging',
    content:
      'Engage with others by leaving comments, sending messages, and interacting on posts to foster a community experience.',
  },
];

export async function GET() {
  return NextResponse.json(posts);
}
