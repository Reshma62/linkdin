import React, { useState, useEffect } from "react";
import AddExprience from "./AddExprience";
import Modal from "./Modal";
import ExprDe from "./ExprDe";
import Expredu from "./Expredu";
import AddEducation from "./AddEducation";
import { getDatabase, ref, onValue } from "firebase/database";
import { useSelector } from "react-redux";
const Education = () =>
{

   const db = getDatabase();
   const [allEducation, setAllEducation] = useState([]);
   let data = useSelector((state) => state.allusersInfo.userInfo);
  const [isOpen, setIsOpen] = useState(false);
  function toggleModal() {
    setIsOpen(!isOpen);
  }
    useEffect(() => {
      const expriceRef = ref(db, "education/");
      onValue(expriceRef, (snapshot) => {
        let arr = [];
        snapshot.forEach((item) => {
          if (data.uid == item.val().userId) {
            arr.push({ ...item.val(), expId: item.key });
          }
        });
        setAllEducation(arr);
      });
    }, []);
  return (
    <>
      <div className="p-9 bg-white rounded-lg ">
        <Expredu
          handleOpenInfo={toggleModal}
          button={`Add Education`}
          heading="Education"
        ></Expredu>
        {allEducation.length == 0 ? (
          <h1>No Education add</h1>
        ) : (
          allEducation.map((item) => (
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
          <AddEducation setIsOpen={setIsOpen} />
        </Modal>
      )}
    </>
  );
};

export default Education;
