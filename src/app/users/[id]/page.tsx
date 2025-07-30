import Link from 'next/link';
import Image from 'next/image';

interface UserProfilePageProps {
  params: Promise<{
    id: string;
  }>;
}

// Mock user data - in a real app, this would come from a database
const users = {
  '1': {
    id: '1',
    name: 'Alice Johnson',
    email: 'alice@example.com',
    bio: 'Frontend developer passionate about React and Next.js. I love building user-friendly web applications.',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    joinDate: '2023-06-15',
    posts: 12,
    followers: 156
  },
  '2': {
    id: '2',
    name: 'Bob Smith',
    email: 'bob@example.com',
    bio: 'Full-stack developer with expertise in Node.js, React, and cloud technologies.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    joinDate: '2023-03-22',
    posts: 8,
    followers: 89
  },
  '3': {
    id: '3',
    name: 'Carol Davis',
    email: 'carol@example.com',
    bio: 'UI/UX designer and developer. Creating beautiful and functional user experiences.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    joinDate: '2023-09-10',
    posts: 23,
    followers: 234
  }
};

export default async function UserProfilePage({ params }: UserProfilePageProps) {
  const { id } = await params;
  const user = users[id as keyof typeof users];

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">User Not Found</h1>
          <p className="text-gray-600 mb-8">User with ID &quot;{id}&quot; doesn&apos;t exist.</p>
          <Link 
            href="/users"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Back to Users
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 max-w-2xl mx-auto">
      <Link 
        href="/users"
        className="text-blue-500 hover:text-blue-700 mb-8 inline-block"
      >
        ← Back to Users
      </Link>
      
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="flex items-center mb-6">
          <Image 
            src={user.avatar} 
            alt={user.name}
            width={80}
            height={80}
            className="w-20 h-20 rounded-full mr-6"
          />
          <div>
            <h1 className="text-3xl font-bold">{user.name}</h1>
            <p className="text-gray-600">{user.email}</p>
          </div>
        </div>
        
        <div className="mb-6">
          <p className="text-gray-700 leading-relaxed">{user.bio}</p>
        </div>
        
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{user.posts}</div>
            <div className="text-sm text-gray-600">Posts</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{user.followers}</div>
            <div className="text-sm text-gray-600">Followers</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {new Date(user.joinDate).getFullYear()}
            </div>
            <div className="text-sm text-gray-600">Joined</div>
          </div>
        </div>
        
        <div className="text-sm text-gray-500">
          Member since {new Date(user.joinDate).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
}

