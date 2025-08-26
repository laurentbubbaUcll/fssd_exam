import Header from '@components/header';
import TeacherOverview from '@components/teachers/TeacherOverview';
import TeacherService from '@services/TeacherService';
import { Teacher } from '@types';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import useSWR, { mutate } from 'swr';

const Teachers: React.FC = () => {
  const fetcher = async (key: string) => {
    /* Use the TeacherService to fetch all teachers */
    const teachers = await TeacherService.getAllTeachers();
    return teachers;
  };

  const { data, isLoading, error } = useSWR<Teacher[]>('Teachers', fetcher);

  return (
    <>
      <Head>
        <title>Teachers</title>
      </Head>
      <Header />
      <main className="p-6 min-h-screen flex flex-col items-center">
        <h1>Teachers</h1>

        <section className="mt-5">
          {error && <p className="text-danger">{error}</p>}
          {isLoading && <p>Loading...</p>}
          {/* Use the TeacherOverview component to render data */}
          {!isLoading && data && (
            <TeacherOverview teachers={data} />
          )}
        </section>
      </main>
    </>
  );
};

export const getServerSideProps = async (context) => {
  const { locale } = context;

  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common'])),
    },
  };
};

export default Teachers;
