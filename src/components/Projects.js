import React, { useEffect, useState } from "react";
import Flex from "../components/Flex";
import Images from "../components/Images";
import AddProjects from "./AddProjects";
import Modal from "./Modal";
import { getDatabase, ref, onValue } from "firebase/database";
import { useSelector } from "react-redux";
const Projects = () => {
  const db = getDatabase();
  let data = useSelector((state) => state.allusersInfo.userInfo);
  const [isOpen, setIsOpen] = useState(false);
  const [projects, setProjects] = useState([]);

  function toggleModal() {
    setIsOpen(!isOpen);
  }
  useEffect(() => {
    const projectsRef = ref(db, "projects/");
    onValue(projectsRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (data.uid == item.val().userId) {
          arr.push(item.val());
        }
      });
      setProjects(arr);
    });
  }, []);

  return (
    <div className="p-9 bg-white rounded-lg mb-5">
      <Flex className="justify-between mb-5 items-center">
        <h2 className="font-bold font-nunito text-xl text-[#181818]">
          Projects
        </h2>
        <button
          onClick={toggleModal}
          className="bg-primary text-white font-medium font-nunito px-6 py-3 rounded-lg "
        >
          Add Project
        </button>
      </Flex>

      <Flex className={`flex-wrap gap-8 h-[500px] overflow-y-auto `}>
        {projects.length==0 ? <h1>No projects add</h1> :
        projects
          .sort((a, b) => b.timeStamp - a.timeStamp)
          .map((item) => (
            <div className="w-[30%]">
              <div className="mb-4 max-w-full h-[200px] border border-solid border-black">
                <Images imgsrc={item.projectImg} className="w-full object-cover" />
              </div>
              <h4 className="font-bold font-nunito text-base text-[#181818]">
                {item.projectTitle}
              </h4>
              <p>{item.projectSubTitle}</p>
            </div>
          ))}
      </Flex>

      {isOpen && (
        <Modal toggleModal={toggleModal} title="Add Your Recent Work">
          <AddProjects setIsOpen={setIsOpen} />
        </Modal>
      )}
    </div>
  );
};

export default Projects;
