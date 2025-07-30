import Link from 'next/link';

// Mock user data - same as in the dynamic route
const users = {
  '1': {
    id: '1',
    name: 'Alice Johnson',
    email: 'alice@example.com',
    bio: 'Frontend developer passionate about React and Next.js.',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    posts: 12,
    followers: 156
  },
  '2': {
    id: '2',
    name: 'Bob Smith',
    email: 'bob@example.com',
    bio: 'Full-stack developer with expertise in Node.js, React, and cloud technologies.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    posts: 8,
    followers: 89
  },
  '3': {
    id: '3',
    name: 'Carol Davis',
    email: 'carol@example.com',
    bio: 'UI/UX designer and developer. Creating beautiful and functional user experiences.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    posts: 23,
    followers: 234
  }
};

export default function UsersPage() {
  return (
    <div className="min-h-screen p-8 max-w-4xl mx-auto">
      <header className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Users</h1>
        <p className="text-xl text-gray-600">Meet our community members</p>
      </header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Object.entries(users).map(([id, user]) => (
          <Link key={id} href={`/users/${id}`}>
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-center mb-4">
                <img 
                  src={user.avatar} 
                  alt={user.name}
                  className="w-16 h-16 rounded-full mr-4"
                />
                <div>
                  <h2 className="text-xl font-bold">{user.name}</h2>
                  <p className="text-gray-600 text-sm">{user.email}</p>
                </div>
              </div>
              
              <p className="text-gray-700 text-sm mb-4 line-clamp-2">{user.bio}</p>
              
              <div className="flex justify-between text-sm text-gray-500">
                <span>{user.posts} posts</span>
                <span>{user.followers} followers</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}