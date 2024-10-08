'use client';

import { useState } from 'react';
import axios from 'axios';
import { SafeUser } from '@/app/types';
import Avatar from '@/app/components/Avatar';
import Button from '@/app/components/Button';

interface CommentSectionProps {
  listingId: string;
  currentUser?: SafeUser | null;
  comments: Comment[];
  setComments: React.Dispatch<React.SetStateAction<Comment[]>>;
}

interface Comment {
  id: string;
  content: string;
  createdAt: string;
  user: SafeUser;
}

const CommentSection: React.FC<CommentSectionProps> = ({ 
  listingId, 
  currentUser, 
  comments,
  setComments 
}) => {
  const [newComment, setNewComment] = useState('');

  const handleSubmitComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!currentUser) return;

    try {
      const response = await axios.post('/api/comments', { listingId, content: newComment });
      setComments(prevComments => [...prevComments, response.data]);
      setNewComment('');
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-semibold mb-4">Commentaires</h2>
      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="flex items-start space-x-4">
            <Avatar src={comment.user.image} />
            <div>
              <p className="font-semibold">{comment.user.name}</p>
              <p>{comment.content}</p>
              <p className="text-sm text-gray-500">{new Date(comment.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        ))}
      </div>
      {currentUser && (
        <form onSubmit={handleSubmitComment} className="mt-6">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Ajouter un commentaire..."
            className="w-full p-2 border rounded-md"
            rows={3}
          />
          <Button
            disabled={!newComment.trim()}
            label="Poster le commentaire"
            onClick={() => {}}
          />
        </form>
      )}
    </div>
  );
};

export default CommentSection;


