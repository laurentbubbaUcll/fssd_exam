import TeacherService from '@services/TeacherService';
import { useState } from 'react';
import { mutate } from 'swr';

type Props = {
  teacherId: number;
  learningPath: string;
};

const LearningPath: React.FC<Props> = ({ teacherId, learningPath }: Props) => {
  const handleLearningPathChange = async (event: { target: { value: string } }) => {
    {
      const response = await TeacherService.updateLearningPath(teacherId, event.target.value);
      mutate('Teachers');
    }
  };

  return (
    <div className="ml-6">
      <select id="learningPath" className="ml-2 p-1" value={learningPath} onChange={handleLearningPathChange}>
        <option value="Infrastructure">Infrastructure</option>
        <option value="Software development">Software development</option>
        <option value="Cybersecurity">Cybersecurity</option>
      </select>
    </div>
  );
};

export default LearningPath;
