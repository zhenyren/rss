// import { useEffect, useState } from "react";
// import { useUserStore } from "../../store/a_test";
import { useUserStore } from "../../store/useUserStore";
import "./MessageAssistantCard.css";
import { invoke } from "@tauri-apps/api/core";
// import { Store } from "@tauri-apps/plugin-store";
// import { LazyStore } from "@tauri-apps/plugin-store";

export default function MessageAssistantCard() {
  // const store = new LazyStore("cache.json");

  // const [store, setStore] = useState<Store>();
  const { user } = useUserStore();

  const onHideClick = () => {
    invoke("hide_message_assistant_card_window");
  };

  return (
    <div
      className="w-screen h-screen bg-blue text-white p-4"
      data-tauri-drag-region
    >
      <h1 className="text-2xl font-bold bg-red" data-tauri-drag-region>
        Hello, world!!
      </h1>
      <button onClick={onHideClick}>隐藏</button>
      <p>当前名字：{user.name}</p>
      {/* <button onClick={() => store.set("name", "张三")}>设置名字</button> */}
    </div>
  );
}
