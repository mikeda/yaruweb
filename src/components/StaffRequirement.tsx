import { Avatar, Button, Card, CardActions, CardContent, CardHeader, Typography } from '@material-ui/core';
import { People, Twitter } from '@material-ui/icons';
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
        <Button color="default" href="https://twitter.com/mikeda" target="_blank" startIcon={<Twitter />}>
          Twitter
        </Button>
      </CardActions>
    </Card>
  );
};
