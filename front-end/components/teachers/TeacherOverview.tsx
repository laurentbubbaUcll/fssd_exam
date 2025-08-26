import LearningPath from '@components/learning-path';
import TeacherService from '@services/TeacherService';
import { Teacher, User } from '@types';
import { useEffect, useState } from 'react';
import useSWR, { mutate } from 'swr';

type Props = {
  teachers: Teacher[];
};

const TeacherOverview: React.FC<Props> = ({ teachers }: Props) => {
  const [loggedInUser, setLoggedInUser] = useState<User>(null);

  useEffect(() => {
    setLoggedInUser(JSON.parse(sessionStorage.getItem('loggedInUser')));
  }, []);

  return (
    <>
      <section className="mt-5">
        <table>
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Learning path</th>
            </tr>
          </thead>
          <tbody>
            {teachers.map((teacher, index) =>(
              <tr key={index}>
                <td>{teacher.user.firstName + " " + teacher.user.lastName}</td>
                {(loggedInUser?.role === "admin") ? (
                  <td>                  
                    <LearningPath teacherId={teacher.id} learningPath={teacher.learningPath} />
                  </td>
                ) : (
                  <td>{teacher.learningPath}</td>
                )}
              </tr>
            ))
            }
          </tbody>
        </table>
      </section>
    </>
  );
};

export default TeacherOverview;
