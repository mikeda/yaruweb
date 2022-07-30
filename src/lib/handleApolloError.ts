import { ApolloError } from '@apollo/client';
import { toast } from 'react-toastify';

export const handleApolloError = (error: ApolloError) => {
  toast.error(error.message);
};
