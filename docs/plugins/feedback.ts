import { v4 as uuidv4 } from 'uuid';

export default defineNuxtPlugin(() => {
  if (typeof window !== 'undefined') {
    const storage = window.localStorage;

    if (!storage.getItem("feedback-uuid")) {
      storage.setItem("feedback-uuid", uuidv4());
    }
  }
});
