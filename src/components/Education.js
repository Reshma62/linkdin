import React, { useState } from "react";
import AddExprience from "./AddExprience";
import Modal from "./Modal";
import ExprDe from "./ExprDe";
import Expredu from "./Expredu";
import AddEducation from "./AddEducation";

const Education = () => {
  const [isOpen, setIsOpen] = useState(false);
  function toggleModal() {
    setIsOpen(!isOpen);
  }
  return (
    <>
      <div className="p-9 bg-white rounded-lg ">
        <Expredu
          handleOpenInfo={toggleModal}
          button={`Add Education`}
          heading="Education"
        ></Expredu>
        <ExprDe
          imgsrc="assets/cmlogo2.png"
          jobTitle="Freelance UX/UI designer"
          year="3 yrs 3 mos"
          description="Work with clients and web studios as freelancer.  Work in next areas: eCommerce web projects; creative landing pages; iOs and Android apps; corporate web sites and corporate identity sometimes."
          place="Self Employed"
          time="Jun 2016 — Present"
        />
        <ExprDe
          imgsrc="assets/logo.png"
          jobTitle="Freelance UX/UI designer"
          year="3 yrs 3 mos"
          description="Work with clients and web studios as freelancer.  Work in next areas: eCommerce web projects; creative landing pages; iOs and Android apps; corporate web sites and corporate identity sometimes."
          place="Self Employed"
          time="Jun 2016 — Present"
        />
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
