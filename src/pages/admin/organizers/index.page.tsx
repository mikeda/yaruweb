import React, { useState } from 'react';

import { Add as AddIcon, MoreVert } from '@mui/icons-material';
import { Button, IconButton, Menu, MenuItem, TableCell, TableRow, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { useSetRecoilState } from 'recoil';

import { AdminContent, AdminBreadcrumbs, DashboardTable, DashboardTablePaging } from '@/components';
import { pagesPath } from '@/generated/$path';
import {
  AdminOrganizersPageOrganizerFragment,
  useAdminOrganizersPageDeleteMutation,
  useAdminOrganizersPageOrganizersQuery,
} from '@/generated/graphql';
import { loadingState, DEFAULT_AVATAR_URL, resolveUrlObject } from '@/lib';

const Page: React.FC = () => {
  const router = useRouter();
  const setLoading = useSetRecoilState(loadingState);
  const { data, loading, fetchMore, updateQuery } = useAdminOrganizersPageOrganizersQuery();
  const [destroy, { loading: deleteLoading }] = useAdminOrganizersPageDeleteMutation({
    onCompleted: data => {
      const organizer = data.deleteOrganizer?.organizer;
      if (!organizer) return;

      updateQuery(prev => ({
        organizers: {
          ...prev.organizers,
          records: prev.organizers.records.filter(t => t.id !== organizer.id),
        },
      }));
      toast.success('オーガナイザーを削除しました。');
    },
  });

  setLoading(loading || deleteLoading);

  if (!data) return null;
  const { records: organizers, paging } = data.organizers;

  return (
    <AdminContent
      title="オーガナイザー"
      breadcrumb={<AdminBreadcrumbs to="organizers" />}
      actions={
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          href={resolveUrlObject(router, pagesPath.admin.organizers.new.$url())}
        >
          作成する
        </Button>
      }
    >
      <DashboardTable>
        {organizers.map(organizer => (
          <OrganizerRow
            key={organizer.id}
            organizer={organizer}
            onDelete={() => {
              if (window.confirm('削除します。')) {
                destroy({ variables: { organizerSlug: organizer.slug } });
              }
            }}
          />
        ))}
      </DashboardTable>

      {paging?.hasNext && (
        <DashboardTablePaging
          onClick={() => {
            fetchMore({
              variables: { page: paging.currentPage + 1 },
              updateQuery: (prev, { fetchMoreResult: data }) => {
                if (!data) return prev;

                return {
                  organizers: {
                    records: [...prev.organizers.records, ...data.organizers.records],
                    paging: data.organizers.paging,
                  },
                };
              },
            });
          }}
        />
      )}
    </AdminContent>
  );
};

interface OrganizerRowProps {
  organizer: AdminOrganizersPageOrganizerFragment;
  onDelete: () => void;
}

const OrganizerRow = ({ organizer, onDelete }: OrganizerRowProps) => {
  const router = useRouter();
  return (
    <TableRow>
      <TableCell scope="row" width={64}>
        <img src={organizer.avatarUrl || DEFAULT_AVATAR_URL} width={64} />
      </TableCell>
      <TableCell scope="row">
        <Typography>{organizer.name}</Typography>
      </TableCell>
      <TableCell align="right" scope="row">
        <Button
          variant="outlined"
          href={resolveUrlObject(router, pagesPath.admin.organizers._slug(organizer.slug).edit.$url())}
        >
          編集
        </Button>
        <OrganizerMenu organizer={organizer} onDelete={onDelete} />
      </TableCell>
    </TableRow>
  );
};

const OrganizerMenu = ({ onDelete }: OrganizerRowProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton edge="end" onClick={handleClick} size="large">
        <MoreVert />
      </IconButton>

      <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem
          onClick={() => {
            onDelete();
            handleClose();
          }}
        >
          削除する
        </MenuItem>
      </Menu>
    </>
  );
};

export default Page;
