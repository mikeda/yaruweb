import React from 'react';

import { EventFragment, useCreateEventMutation } from '@/lib/graphql/types';
import dayjs from '@/lib/dayjs';
import { FormModal } from './FormModal';
import { EventForm } from './EventForm';
import { toast } from 'react-toastify';

interface Props {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onCreated: (event: EventFragment) => void;
}

export const CreateModal: React.FC<Props> = ({ isOpen, setIsOpen, onCreated }) => {
  const [createEvent, { loading }] = useCreateEventMutation({
    onCompleted: ({ createEvent: res }) => {
      if (!res) return;
      onCreated(res.event);
      toast.success('イベントを登録しました。');
      setIsOpen(false);
    },
    onError: e => {
      toast.error(e.message);
    },
  });

  return (
    <FormModal isOpen={isOpen} setIsOpen={setIsOpen}>
      <EventForm
        initialAttributes={{
          name: '',
          organizerName: '',
          organizerTwitterId: '',
          url: '',
          imageUrl: '',
          streamingUrl: '',
          videoUrl: '',
          startsAt: dayjs().add(1, 'date').hour(18).minute(0).second(0).format('YYYY-MM-DD HH:mm'),
          description: '',
        }}
        loading={loading}
        onSubmit={attributes => createEvent({ variables: { attributes } })}
      />
    </FormModal>
  );
};
