import { redirect } from 'next/navigation';

const HomePage = () => {
  redirect('/incidents');
};

export default HomePage;
