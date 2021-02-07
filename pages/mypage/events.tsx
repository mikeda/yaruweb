import React, { useState } from 'react';

import { EventFragment, useMyEventsQuery } from '@/lib/graphql/types';
import { Layout } from '@/pages-lib/mypage/Layout';
import dayjs from '@/lib/dayjs';
import { UpdateModal } from '@/components/EventFormModal/UpdateModal';
import { CreateModal } from '@/components/EventFormModal/CreateModal';
import { NotFound } from '@/components/NotFound';

const EventList: React.FC<{ createdEvents: EventFragment[] }> = ({ createdEvents }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<EventFragment>();

  const { data, loading, refetch } = useMyEventsQuery();
  if (loading) return <NotFound>読み込み中</NotFound>;

  const events = data?.myEvents.nodes;
  if (!events) return <NotFound>イベントがありません。</NotFound>;

  const allEvents = [...createdEvents, ...events];
  if (allEvents.length === 0) return <NotFound>イベントがありません。</NotFound>;

  return (
    <>
      {editingEvent && (
        <UpdateModal isOpen={isOpen} setIsOpen={setIsOpen} event={editingEvent} onUpdated={() => refetch()} />
      )}

      <div className="bl_horizTable">
        <table>
          <thead>
            <tr>
              <th>タイトル</th>
              <th>開催日時</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {allEvents.map(event => {
              if (!event) return;

              const startsAt = dayjs(event.startsAt).format('YYYY/M/D H:mm');

              return (
                <tr key={event.id}>
                  <td>{event.name}</td>
                  <td>{startsAt}</td>
                  <td>
                    <a
                      onClick={() => {
                        setEditingEvent(event);
                        setIsOpen(true);
                      }}
                    >
                      編集
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

const Page: React.FC = () => {
  const [isOpen, setIsOpenn] = useState(false);
  const [createdEvents, setCreatedEvents] = useState<EventFragment[]>([]);

  return (
    <Layout activeTab="events">
      <div className="bl_myContHeader">
        <button onClick={() => setIsOpenn(true)} className="el_btn">
          登録する
        </button>
        <CreateModal
          isOpen={isOpen}
          setIsOpen={setIsOpenn}
          onCreated={event => setCreatedEvents(prev => [event, ...prev])}
        />
      </div>

      <EventList createdEvents={createdEvents} />
    </Layout>
  );
};

export default Page;
