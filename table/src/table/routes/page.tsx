import { get as hello } from '@api/hello';
import { useEffect, useState } from "react";

const Index = () => {
  const [text, setText] = useState('');

  useEffect(() => {
    hello().then((setText));

  }, []);
  return (
    <>
      <div className="container-box">subApp</div>
      <div>{text}</div>
    </>
  )
}

export default Index;