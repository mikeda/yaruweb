import { Avatar, Button, Card, CardActions, CardContent, CardHeader, Typography } from '@mui/material';
import { People, Twitter } from '@mui/icons-material';
import React from 'react';

export const StaffRequirement: React.FC = () => {
  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar>
            <People />
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
        <Button href="https://twitter.com/mikeda" target="_blank" startIcon={<Twitter />}>
          Twitter
        </Button>
      </CardActions>
    </Card>
  );
};
