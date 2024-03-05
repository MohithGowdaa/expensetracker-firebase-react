import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../config/firebase-config";

const useDeleteTransaction = () => {
  const deleteTransaction = async (transactionId) => {
    try {
      const transactionDocRef = doc(db, "transaction", transactionId);
      await deleteDoc(transactionDocRef);
    } catch (error) {
      console.error("Error deleting transaction:", error.message);
    }
  };

  return { deleteTransaction };
};

export default useDeleteTransaction;
