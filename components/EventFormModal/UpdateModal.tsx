import React from 'react';

import { EventFragment, useUpdateEventMutation } from '@/lib/graphql/types';
import dayjs from '@/lib/dayjs';
import { FormModal } from './FormModal';
import { EventForm } from './EventForm';
import { toast } from 'react-toastify';

interface Props {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onUpdated: (event: EventFragment) => void;
  event: EventFragment;
}

export const UpdateModal: React.FC<Props> = ({ isOpen, setIsOpen, onUpdated, event }) => {
  const [updateEvent, { loading }] = useUpdateEventMutation({
    onCompleted: ({ updateEvent: res }) => {
      if (!res) return;
      onUpdated(res.event);
      toast.success('イベントを更新しました。');
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
          name: event.name,
          organizerTwitterId: event.organizerTwitterId,
          url: event.url,
          entryUrl: event.entryUrl,
          imageUrl: event.imageUrl,
          streamingUrl: event.streamingUrl,
          videoUrl: event.videoUrl,
          description: event.description,
          startsAt: dayjs(event.startsAt).add(1, 'date').hour(18).minute(0).second(0).format('YYYY-MM-DD HH:mm'),
        }}
        loading={loading}
        onSubmit={attributes => updateEvent({ variables: { id: event.id, attributes } })}
      />
    </FormModal>
  );
};
