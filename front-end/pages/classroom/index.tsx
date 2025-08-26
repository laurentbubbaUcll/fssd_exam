import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Header from '@components/header';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { User } from '@types';
import { useTranslation } from 'next-i18next';
import AddClassroomForm from '@components/classroom/AddClassroomForm';

const addClassroom: React.FC = () => {
    const [loggedInUser, setLoggedInUser] = useState<User>(null);

    const { t } = useTranslation();

    useEffect(() => {
        setLoggedInUser(JSON.parse(sessionStorage.getItem('loggedInUser')));
    }, []);

    const addClassroomFunct = async () => {

    }

    if (!(loggedInUser?.role === "admin")){
        return (
            <>
                <Head>
                    {/* TODO: add translations t('classroom.title') */}
                    <title>Add Classroom</title>
                </Head>
                <Header />
                <main className="p-6 min-h-screen flex flex-col items-center">
                    <p className="text-red-500">You are not authorized to view this page.</p>
                </main>
            </>
        );
    }

    return (
        <>
        <Head>
            <title>Add Classroom</title>
        </Head>
        <Header />
        <main className="p-6 min-h-screen flex flex-col items-center">

            <section className="mt-5">
                <AddClassroomForm />
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

export default addClassroom;
