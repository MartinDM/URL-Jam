// query params
import { useRouter } from 'next/router'; // client components only
import styles from './style.module.scss';

const IdPage = ({ params }) => {
  console.log(params.id); // Output in server only
  return (
    <div className={styles.title}>
      Hello {params.id}
      <span>Test</span>
    </div>
  );
};

export default IdPage;
