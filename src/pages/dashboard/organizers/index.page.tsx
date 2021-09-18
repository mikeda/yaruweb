import React, { useState } from 'react';

import { DashboardContent, DashboardBreadcrumbs } from '@/components';
import { dashboardPath } from '@/lib';
import {
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from '@material-ui/core';
import { Add as AddIcon, MoreVert } from '@material-ui/icons';
import { useSetRecoilState } from 'recoil';
import { loadingState } from '@/states/loading';
import {
  DashboardOrganizersPageOrganizerFragment,
  useDashboardOrganizersPageDeleteMutation,
  useDashboardOrganizersPageOrganizersQuery,
} from '@/lib/graphql/types';
import { toast } from 'react-toastify';

const Page: React.FC = () => {
  const setLoading = useSetRecoilState(loadingState);
  const { data, loading, fetchMore, updateQuery } = useDashboardOrganizersPageOrganizersQuery();
  const [destroy, { loading: deleteLoading }] = useDashboardOrganizersPageDeleteMutation({
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
    <DashboardContent
      title="オーガナイザー"
      breadcrumb={<DashboardBreadcrumbs to="organizers" />}
      actions={
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          href={dashboardPath({ to: 'organizersNew' })}
        >
          作成する
        </Button>
      }
    >
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
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
          </TableBody>
        </Table>
      </TableContainer>

      {paging?.hasNext && (
        <Box pt={2} pb={2} display="flex" justifyContent="center">
          <Button
            variant="outlined"
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
          >
            もっとみる
          </Button>
        </Box>
      )}
    </DashboardContent>
  );
};

interface OrganizerRowProps {
  organizer: DashboardOrganizersPageOrganizerFragment;
  onDelete: () => void;
}

const OrganizerRow = ({ organizer, onDelete }: OrganizerRowProps) => {
  return (
    <TableRow>
      <TableCell component="th" scope="row">
        <Typography>{organizer.name}</Typography>
      </TableCell>
      <TableCell align="right" scope="row">
        <Button variant="outlined" href={dashboardPath({ to: 'organizerEdit', organizerSlug: organizer.slug })}>
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
      <IconButton edge="end" onClick={handleClick}>
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
