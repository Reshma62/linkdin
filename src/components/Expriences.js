import React, { useEffect, useState } from "react";
import AddExprience from "./AddExprience";
import Modal from "./Modal";
import ExprDe from "./ExprDe";
import Expredu from "./Expredu";
import { getDatabase, ref, onValue } from "firebase/database";
import { useSelector } from "react-redux";
const Expriences = () => {
  const db = getDatabase();
  const [isOpen, setIsOpen] = useState(false);
  const [allExprience, setAllExprience] = useState([]);
  let data = useSelector((state) => state.allusersInfo.userInfo);
  function toggleModal() {
    setIsOpen(!isOpen);
  }
  useEffect(() => {
    const expriceRef = ref(db, "exprience/");
    onValue(expriceRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (data.uid == item.val().userId) {
          arr.push({ ...item.val(), expId: item.key });
        }
      });
      setAllExprience(arr);
    });
  }, []);

  return (
    <>
      <div className="p-9 bg-white rounded-lg mb-5">
        <Expredu
          handleOpenInfo={toggleModal}
          button={`Add Expriences`}
          heading="Experience"
        ></Expredu>
        {allExprience.length == 0 ? (
          <h1>No exprience add</h1>
        ) : (
          allExprience.map((item) => (
            <ExprDe
              imgsrc={item.projectImg}
              jobTitle={item.projectTitle}
              year={item.workSystem}
              description={item.workDetails}
              time={item.workDuration}
            />
          ))
        )}
      </div>
      {isOpen && (
        <Modal toggleModal={toggleModal} title="Add Your Recent Work">
          <AddExprience setIsOpen={setIsOpen} />
        </Modal>
      )}
    </>
  );
};

export default Expriences;
