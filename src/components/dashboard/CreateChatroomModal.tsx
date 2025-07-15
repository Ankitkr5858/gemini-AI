import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { useChatStore } from '../../store/chatStore';
import { generateId } from '../../utils/generateId';
import toast from 'react-hot-toast';

const schema = z.object({
  title: z.string().min(1, 'Title is required').max(50, 'Title must be less than 50 characters'),
});

type FormData = z.infer<typeof schema>;

interface CreateChatroomModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateChatroomModal: React.FC<CreateChatroomModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { addChatroom } = useChatStore();
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting }, 
    reset 
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: '',
    },
  });

  const onSubmit = async (data: FormData) => {
    try {
      const chatroom = {
        id: generateId(),
        title: data.title,
        createdAt: Date.now(),
        messageCount: 50, // Will be updated by the store with actual count
      };

      addChatroom(chatroom);
      toast.success('Chatroom created successfully!');
      reset();
      onClose();
    } catch (error) {
      toast.error('Failed to create chatroom');
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Create New Chatroom">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Chatroom Title
          </label>
          <input
            {...register('title')}
            type="text"
            placeholder="Enter chatroom title"
            autoFocus
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100 dark:focus:ring-blue-400"
          />
          {errors.title && (
            <p className="text-sm text-red-600 dark:text-red-400 mt-1">
              {errors.title.message}
            </p>
          )}
        </div>
        
        <div className="flex justify-end space-x-2">
          <Button type="button" variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit" loading={isSubmitting}>
            Create Chatroom
          </Button>
        </div>
      </form>
    </Modal>
  );
};