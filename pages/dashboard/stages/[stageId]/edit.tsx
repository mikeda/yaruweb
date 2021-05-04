import React from 'react';

import { StageAttributes, StageDocument, StageFragment, StageQuery, useUpdateStageMutation } from '@/lib/graphql/types';
import { Head } from '@/components/layouts/Head';
import { DashboardContent } from '@/components/layouts/dashboard/DashboardContent';
import { Routes } from '@/lib/Routes';
import { PageHeader } from '@/components/layouts/PageHeader';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { CheckBox } from '@/components/form2/CheckBox';
import { Button } from '@/components/blocks/Button';
import { GetServerSideProps } from 'next';
import { fetchGraphql } from '@/lib/graphql/fetchGraphql';
import { toast } from 'react-toastify';
import { FormInline } from '@/components/form2/FormInline';
import { FormGroup } from '@/components/form2/FormGroup';
import { Input } from '@/components/form2/Input';

interface Props {
  stage: StageFragment;
}

const Page: React.FC<Props> = ({ stage }) => {
  return (
    <DashboardContent activeTab="stage">
      <Head title="ステージ更新" />

      <PageHeader title="ステージ更新" />

      <Form stage={stage} />
    </DashboardContent>
  );
};

const Form: React.FC<Props> = ({ stage }) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<StageAttributes>({
    defaultValues: {
      name: stage.name,
      infinite: stage.infinite,
      wall: stage.wall,
      wallBreak: stage.wallBreak,
      floorBreak: stage.floorBreak,
      balconyBreak: stage.balconyBreak,
    },
  });

  const [updateStage, { loading }] = useUpdateStageMutation({
    onCompleted: () => {
      toast.success('ステージを更新しました。');
      router.push(Routes.dashboard.stage.index());
    },
    onError: e => {
      toast.error(e.message);
    },
  });

  const onSubmit = (attributes: StageAttributes) => {
    updateStage({ variables: { stageId: stage.id, attributes } });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormGroup label="名前">
        <Input {...register('name', { required: true })} />
        {errors.name && <span>This field is required</span>}
      </FormGroup>

      <FormGroup label="プロフィール画像">
        <input
          type="file"
          accept="image/*"
          name="mainImageDummy"
          onChange={e => {
            if (!e.target.files) return;
            const file = e.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = e => {
              if (!e.target) return;

              setValue('mainImage', e.target.result as string);
            };
            reader.readAsDataURL(file);
          }}
        />
        <input type="hidden" name="mainImage" />
      </FormGroup>

      <FormGroup label="ギミック">
        <FormInline>
          <CheckBox id="infinite" label="無限">
            <input id="infinite" type="checkbox" {...register('infinite')} />
          </CheckBox>
          <CheckBox id="wall" label="壁あり">
            <input id="wall" type="checkbox" {...register('wall')} />
          </CheckBox>
          <CheckBox id="wallBreak" label="ウォールブレイク">
            <input id="wallBreak" type="checkbox" {...register('wallBreak')} />
          </CheckBox>
          <CheckBox id="floorBreak" label="フロアブレイク">
            <input id="floorBreak" type="checkbox" {...register('floorBreak')} />
          </CheckBox>
          <CheckBox id="balconyBreak" label="バルコニーブレイク">
            <input id="balconyBreak" type="checkbox" {...register('balconyBreak')} />
          </CheckBox>
        </FormInline>
      </FormGroup>

      <FormGroup>
        <Button>
          <input type="submit" disabled={loading} />
        </Button>
      </FormGroup>
    </form>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const stageId = params?.stageId as string;
  const data: StageQuery = await fetchGraphql(StageDocument, { stageId });

  return { props: { stage: data.stage } };
};

export default Page;
