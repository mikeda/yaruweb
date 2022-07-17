import React from 'react';

import PeopleIcon from '@mui/icons-material/People';
import TwitterIcon from '@mui/icons-material/Twitter';
import { Avatar, Button, Card, CardActions, CardContent, CardHeader, Typography } from '@mui/material';

export const StaffRequirement: React.FC = () => {
  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar>
            <PeopleIcon />
          </Avatar>
        }
        title="運営テケナー募集中"
      />
      <CardContent>
        <Typography>
          大会・キャラデータの作成を手伝ってくれるテケナーを募集しています。
          <br />
          興味があればぜひご連絡下さい！
        </Typography>
      </CardContent>
      <CardActions>
        <Button href="https://twitter.com/mikeda" target="_blank" startIcon={<TwitterIcon />}>
          Twitter
        </Button>
      </CardActions>
    </Card>
  );
};
