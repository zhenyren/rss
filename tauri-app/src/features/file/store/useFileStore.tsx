import { defineStore } from "@/shared/modules/store/defineStore";

interface FileState {
  content: string;
}
export const useFileStore = defineStore<FileState>("file", {
  state: {
    content: "",
  },
});
