import React from 'react';

import { StageAttributes, useCreateStageMutation } from '@/lib/graphql/types';
import { Head } from '@/components/layouts/Head';
import { DashboardContent } from '@/components/layouts/dashboard/DashboardContent';
import { Routes } from '@/lib/Routes';
import { PageHeader } from '@/components/layouts/PageHeader';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { CheckBox } from '@/components/form2/CheckBox';
import { Button } from '@/components/blocks/Button';
import { toast } from 'react-toastify';

const Page: React.FC = () => (
  <DashboardContent activeTab="stage">
    <Head title="ステージ作成" />

    <PageHeader title="ステージ作成" />

    <Form />
  </DashboardContent>
);

const Form: React.FC = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<StageAttributes>();
  const [createStage, { loading }] = useCreateStageMutation({
    onCompleted: () => {
      toast.success('ステージを登録しました。');
      router.push(Routes.dashboard.stage.index());
    },
    onError: e => {
      toast.error(e.message);
    },
  });

  const onSubmit = (attributes: StageAttributes) => {
    createStage({ variables: { attributes } });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input {...register('name', { required: true })} />
        {errors.name && <span>This field is required</span>}
      </div>
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

      <Button>
        <input type="submit" disabled={loading} />
      </Button>
    </form>
  );
};

export default Page;
