"use client";

import { useEffect, useState } from "react";
import ShowQuizes from "@/components/ShowQuizzes";
import { Filters } from "@/components/filterShowQuizzes";
import Modal from "@/components/userModal";
export default function Quizes() {
  const [isOpen, setisOpen] = useState(false);
  const [SelectedRegister, setSelectedRegister] = useState<any>(null);

  function openModal() {
    setisOpen(true);
  }

  function closeModal() {
    setSelectedRegister(null)
    setisOpen(false);
  }

  useEffect(() => {
    if(SelectedRegister != null)
    openModal();
  }, [SelectedRegister]);


  let Data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

  return (
    <div className="col-span-4">
      <Modal isOpen={isOpen} onClose={closeModal}>
        <h2 className="text-lg font-bold mb-2 text-blue-800">Add User</h2>
        <p className="mb-4 text-blue-400">Fill the form</p>
        <form onSubmit={(e) => e.preventDefault()}></form>
      </Modal>
      <Filters setSelectedRegister={setSelectedRegister} />
      <ShowQuizes Data={Data} />
    </div>
  );
}
