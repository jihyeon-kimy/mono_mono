import { COLLECTIONS } from "@constants/collection";
import type { Hotel } from "@models/hotel";
import { fireStore } from "@remote/firebase";
import {
  collection,
  getDocs,
  query,
  limit,
  startAfter,
  type DocumentData,
  type QueryDocumentSnapshot,
} from "firebase/firestore";

export async function getHotels(
  pageParams?: QueryDocumentSnapshot<DocumentData, DocumentData>
) {
  const hotelQuery =
    pageParams == null
      ? query(collection(fireStore, COLLECTIONS.HOTELS), limit(10))
      : query(
          collection(fireStore, COLLECTIONS.HOTELS),
          startAfter(pageParams),
          limit(10)
        );

  const snapshot = await getDocs(hotelQuery);

  const lastVisible = snapshot.docs[snapshot.docs.length - 1];

  const hotels = snapshot.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data(),
    } as Hotel;
  });

  return { hotels, lastVisible };
}
