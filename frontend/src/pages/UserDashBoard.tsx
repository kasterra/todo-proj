import { useParams } from 'react-router-dom';

const UserDashBoard = () => {
  const { userId } = useParams() as { userId: string };
  return <div>PersonalDashboard {userId}</div>;
};

export default UserDashBoard;
