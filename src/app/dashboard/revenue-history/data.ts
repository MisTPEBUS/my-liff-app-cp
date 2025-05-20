export type MsgStatus = "成功" | "失敗"; // 若未來有更多狀態可補上

export type MsgRecord = {
  id: string;
  company: string;
  dept: string;
  has_reported: boolean;
  reported_at: string | null;
  user_id: string;
  groupCode: string;
  message: string;
  status: MsgStatus;
  sendAt: string;
  createdAt: string;
};

type GroupedMsgRecord = Omit<MsgRecord, "id"> & {
  count: number;
};
export type GroupedMsgRecordProps = {
  record: GroupedMsgRecord;
};

export function groupAndSort(data: MsgRecord[]): GroupedMsgRecord[] {
  const groupedMap = new Map<string, GroupedMsgRecord>();

  for (const record of data) {
    const key = `${record.user_id}_${record.groupCode}`;
    const existing = groupedMap.get(key);

    if (!existing) {
      groupedMap.set(key, {
        ...record,
        count: 1,
      });
    } else {
      const existingDate = new Date(existing.createdAt).getTime();
      const currentDate = new Date(record.createdAt).getTime();

      // 若目前這筆是較新的 createdAt，則更新整筆資料內容
      if (currentDate > existingDate) {
        groupedMap.set(key, {
          ...record,
          count: existing.count + 1,
        });
      } else {
        // 只更新 count
        existing.count += 1;
        groupedMap.set(key, existing);
      }
    }
  }

  // 排序規則：reported_at === null 優先，接著 createdAt DESC
  return Array.from(groupedMap.values()).sort((a, b) => {
    const aReported = a.reported_at ? 1 : 0;
    const bReported = b.reported_at ? 1 : 0;

    if (aReported !== bReported) {
      return aReported - bReported; // null (0) comes before not-null (1)
    }

    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
}

export const msgRecordsTest: MsgRecord[] = [
  {
    id: "370a000f-4460-42e2-adc2-feac0bf90612",
    company: "臺北客運",
    dept: "資訊中心",
    has_reported: true,
    reported_at: "2025-05-20T14:17:00.000Z",
    user_id: "U71a5a5954c9a6cdb0f40cefce0eaafa4",
    groupCode: "營收訊息通報",
    message:
      "【營收訊息通報】 \n\n 114/05/16\n [訊息測試]\n LineMsg 群發回報測試",
    status: "成功",
    sendAt: "2025-05-20 11:54",
    createdAt: "2025-05-20T03:54:11.501Z",
  },
  {
    id: "73b00cdf-7ca7-4088-bae5-c7ed94b2e6ce",
    company: "臺北客運",
    dept: "資訊中心",
    has_reported: false,
    reported_at: null,
    user_id: "Uda424467d2d66f7f659e615733c49b01",
    groupCode: "營收訊息通報",
    message:
      "【營收訊息通報】 \n\n 114/05/16\n [訊息測試]\n LineMsg 群發回報測試",
    status: "成功",
    sendAt: "2025-05-20 11:48",
    createdAt: "2025-05-20T03:48:51.378Z",
  },
  {
    id: "c515d1f3-f865-4af5-86a6-e0e77981944e",
    company: "臺北客運",
    dept: "資訊中心",
    has_reported: false,
    reported_at: null,
    user_id: "Uc548fe194a5babbfa05cf1ab5d1066ec",
    groupCode: "營收訊息通報",
    message:
      "【營收訊息通報】 \n\n 114/05/16\n [訊息測試]\n LineMsg 群發回報測試",
    status: "成功",
    sendAt: "2025-05-20 11:48",
    createdAt: "2025-05-20T03:48:51.724Z",
  },
  {
    id: "63b70dbe-60a2-4810-99e8-d3833d3fb1e4",
    company: "臺北客運",
    dept: "資訊中心",
    has_reported: true,
    reported_at: "2025-05-20T11:49:00.000Z",
    user_id: "Ud40f2e79e017b84f635a6f226486ba12",
    groupCode: "營收訊息通報",
    message:
      "【營收訊息通報】 \n\n 114/05/16\n [訊息測試]\n LineMsg 群發回報測試",
    status: "成功",
    sendAt: "2025-05-20 11:48",
    createdAt: "2025-05-20T03:48:52.663Z",
  },
  {
    id: "26429054-c9c0-49ff-bc23-26f695404072",
    company: "臺北客運",
    dept: "資訊中心",
    has_reported: false,
    reported_at: null,
    user_id: "U71a5a5954c9a6cdb0f40cefce0eaafa4",
    groupCode: "營收通知系統",
    message:
      "【營收訊息通報】 \n\n 114/04/14\n [訊息測試]\n LineMsg新環境 🚌🚌🚌",
    status: "成功",
    sendAt: "2025-05-20 13:56",
    createdAt: "2025-05-20T05:56:40.307Z",
  },
  {
    id: "350bfb58-b050-4e00-a39c-e0130f8493d0",
    company: "首都客運",
    dept: "資訊中心",
    has_reported: false,
    reported_at: null,
    user_id: "U75e1554845bd81cba2151682ee99363d",
    groupCode: "營收通知系統",
    message:
      "【營收訊息通報】 \n\n 114/04/14\n [訊息測試]\n LineMsg新環境 🚌🚌🚌",
    status: "成功",
    sendAt: "2025-05-20 13:56",
    createdAt: "2025-05-20T05:56:40.832Z",
  },
  {
    id: "33b44652-3005-4e1c-b9b6-1fa5df77cbf5",
    company: "臺北客運",
    dept: "資訊中心",
    has_reported: true,
    reported_at: "2025-05-20T14:17:00.000Z",
    user_id: "U71a5a5954c9a6cdb0f40cefce0eaafa4",
    groupCode: "營收訊息通報",
    message:
      "【營收訊息通報】 \n\n 114/05/16\n [訊息測試]\n LineMsg 群發回報測試",
    status: "成功",
    sendAt: "2025-05-20 11:55",
    createdAt: "2025-05-20T03:55:08.742Z",
  },
  {
    id: "6d1cb427-b939-487d-b23c-4bd45879506d",
    company: "臺北客運",
    dept: "資訊中心",
    has_reported: true,
    reported_at: "2025-05-20T14:17:00.000Z",
    user_id: "U71a5a5954c9a6cdb0f40cefce0eaafa4",
    groupCode: "營收訊息通報",
    message:
      "【營收訊息通報】 \n\n 114/05/16\n [訊息測試]\n LineMsg 群發回報測試",
    status: "成功",
    sendAt: "2025-05-20 11:32",
    createdAt: "2025-05-20T03:32:34.140Z",
  },
  {
    id: "9f6f195f-23be-46eb-9fef-f2a2850c9fd4",
    company: "臺北客運",
    dept: "資訊中心",
    has_reported: true,
    reported_at: "2025-05-20T14:17:00.000Z",
    user_id: "U71a5a5954c9a6cdb0f40cefce0eaafa4",
    groupCode: "營收訊息通報",
    message:
      "【營收訊息通報】 \n\n 114/05/16\n [訊息測試]\n LineMsg 群發回報測試",
    status: "成功",
    sendAt: "2025-05-20 11:40",
    createdAt: "2025-05-20T03:40:13.056Z",
  },
  {
    id: "ae959544-a0d2-4385-a9be-59eb334de25b",
    company: "臺北客運",
    dept: "資訊中心",
    has_reported: true,
    reported_at: "2025-05-20T11:57:00.000Z",
    user_id: "U62ea7a3373ca9d9de8e4c975219096c6",
    groupCode: "營收訊息通報",
    message:
      "【營收訊息通報】 \n\n 114/05/16\n [訊息測試]\n LineMsg 群發回報測試",
    status: "成功",
    sendAt: "2025-05-20 11:48",
    createdAt: "2025-05-20T03:48:52.155Z",
  },
  {
    id: "ef57e409-ed40-4b45-aa7d-70ecae8f0ee8",
    company: "臺北客運",
    dept: "資訊中心",
    has_reported: false,
    reported_at: null,
    user_id: "U71a5a5954c9a6cdb0f40cefce0eaafa4",
    groupCode: "營收通知系統",
    message:
      "【營收訊息通報】 \n\n 114/04/14\n [訊息測試]\n LineMsg新環境 🚌🚌🚌",
    status: "成功",
    sendAt: "2025-05-20 13:56",
    createdAt: "2025-05-20T05:56:38.452Z",
  },
  {
    id: "b16398df-f146-468b-acbc-8845e5c7e1b2",
    company: "首都客運",
    dept: "資訊中心",
    has_reported: false,
    reported_at: null,
    user_id: "U75e1554845bd81cba2151682ee99363d",
    groupCode: "營收通知系統",
    message:
      "【營收訊息通報】 \n\n 114/04/14\n [訊息測試]\n LineMsg新環境 🚌🚌🚌",
    status: "成功",
    sendAt: "2025-05-20 13:56",
    createdAt: "2025-05-20T05:56:38.984Z",
  },
  {
    id: "8c470a65-fc0b-48a7-8a47-1ab9483d4c3e",
    company: "臺北客運",
    dept: "資訊中心",
    has_reported: false,
    reported_at: null,
    user_id: "U71a5a5954c9a6cdb0f40cefce0eaafa4",
    groupCode: "營收通知系統",
    message:
      "【營收訊息通報】 \n\n 114/04/14\n [訊息測試]\n LineMsg新環境 🚌🚌🚌",
    status: "成功",
    sendAt: "2025-05-20 13:56",
    createdAt: "2025-05-20T05:56:42.154Z",
  },
  {
    id: "a8369767-cfd2-47c4-9548-4f320f24249d",
    company: "首都客運",
    dept: "資訊中心",
    has_reported: false,
    reported_at: null,
    user_id: "U75e1554845bd81cba2151682ee99363d",
    groupCode: "營收通知系統",
    message:
      "【營收訊息通報】 \n\n 114/04/14\n [訊息測試]\n LineMsg新環境 🚌🚌🚌",
    status: "成功",
    sendAt: "2025-05-20 13:56",
    createdAt: "2025-05-20T05:56:42.652Z",
  },
  {
    id: "fafff191-d5f6-44a0-ad62-b350bd00aa01",
    company: "臺北客運",
    dept: "資訊中心",
    has_reported: false,
    reported_at: null,
    user_id: "U71a5a5954c9a6cdb0f40cefce0eaafa4",
    groupCode: "營收通知系統",
    message:
      "【營收訊息通報】 \n\n 114/04/14\n [訊息測試]\n LineMsg新環境 🚌🚌🚌",
    status: "成功",
    sendAt: "2025-05-20 13:56",
    createdAt: "2025-05-20T05:56:43.921Z",
  },
  {
    id: "d1c333cb-2022-493f-a70f-3dcf7c307f82",
    company: "首都客運",
    dept: "資訊中心",
    has_reported: false,
    reported_at: null,
    user_id: "U75e1554845bd81cba2151682ee99363d",
    groupCode: "營收通知系統",
    message:
      "【營收訊息通報】 \n\n 114/04/14\n [訊息測試]\n LineMsg新環境 🚌🚌🚌",
    status: "成功",
    sendAt: "2025-05-20 13:56",
    createdAt: "2025-05-20T05:56:44.417Z",
  },
  {
    id: "3d3ad1ed-900d-41d8-9e51-6ff3aada6b2f",
    company: "臺北客運",
    dept: "資訊中心",
    has_reported: false,
    reported_at: null,
    user_id: "U71a5a5954c9a6cdb0f40cefce0eaafa4",
    groupCode: "營收通知系統",
    message:
      "【營收訊息通報】 \n\n 114/04/14\n [訊息測試]\n LineMsg新環境 🚌🚌🚌",
    status: "成功",
    sendAt: "2025-05-20 13:56",
    createdAt: "2025-05-20T05:56:45.753Z",
  },
  {
    id: "e945dd11-57e0-494b-bb85-0781b3d118a6",
    company: "首都客運",
    dept: "資訊中心",
    has_reported: false,
    reported_at: null,
    user_id: "U75e1554845bd81cba2151682ee99363d",
    groupCode: "營收通知系統",
    message:
      "【營收訊息通報】 \n\n 114/04/14\n [訊息測試]\n LineMsg新環境 🚌🚌🚌",
    status: "成功",
    sendAt: "2025-05-20 13:56",
    createdAt: "2025-05-20T05:56:46.222Z",
  },
  {
    id: "0f8a79ae-a9d5-41d0-9ae6-0ac9e42cfeaf",
    company: "臺北客運",
    dept: "資訊中心",
    has_reported: true,
    reported_at: "2025-05-20T14:17:00.000Z",
    user_id: "U71a5a5954c9a6cdb0f40cefce0eaafa4",
    groupCode: "營收訊息通報",
    message:
      "【營收訊息通報】 \n\n 114/05/16\n [訊息測試]\n LineMsg 群發回報測試",
    status: "成功",
    sendAt: "2025-05-20 11:45",
    createdAt: "2025-05-20T03:45:18.807Z",
  },
  {
    id: "41c1d49c-e048-4fbb-90bc-53fef96536cb",
    company: "首都客運",
    dept: "資訊中心",
    has_reported: true,
    reported_at: "2025-05-20T14:15:00.000Z",
    user_id: "U75e1554845bd81cba2151682ee99363d",
    groupCode: "營收訊息通報",
    message:
      "【營收訊息通報】 \n\n 114/05/16\n [訊息測試]\n LineMsg 群發回報測試",
    status: "成功",
    sendAt: "2025-05-20 11:54",
    createdAt: "2025-05-20T03:54:11.932Z",
  },
  {
    id: "e40e3c96-d4dd-4e16-baf9-821f67d15843",
    company: "首都客運",
    dept: "資訊中心",
    has_reported: true,
    reported_at: "2025-05-20T14:15:00.000Z",
    user_id: "U75e1554845bd81cba2151682ee99363d",
    groupCode: "營收訊息通報",
    message:
      "【營收訊息通報】 \n\n 114/05/16\n [訊息測試]\n LineMsg 群發回報測試",
    status: "成功",
    sendAt: "2025-05-20 11:55",
    createdAt: "2025-05-20T03:55:09.232Z",
  },
  {
    id: "fbc94066-0172-4786-9ee2-72924e0c1512",
    company: "首都客運",
    dept: "資訊中心",
    has_reported: true,
    reported_at: "2025-05-20T14:15:00.000Z",
    user_id: "U75e1554845bd81cba2151682ee99363d",
    groupCode: "營收訊息通報",
    message:
      "【營收訊息通報】 \n\n 114/05/16\n [訊息測試]\n LineMsg 群發回報測試",
    status: "成功",
    sendAt: "2025-05-20 11:48",
    createdAt: "2025-05-20T03:48:27.862Z",
  },
  {
    id: "1977da67-b0b9-4187-a324-3bca960ee0dd",
    company: "首都客運",
    dept: "資訊中心",
    has_reported: true,
    reported_at: "2025-05-20T14:15:00.000Z",
    user_id: "U75e1554845bd81cba2151682ee99363d",
    groupCode: "營收訊息通報",
    message:
      "【營收訊息通報】 \n\n 114/05/16\n [訊息測試]\n LineMsg 群發回報測試",
    status: "成功",
    sendAt: "2025-05-20 11:48",
    createdAt: "2025-05-20T03:48:53.451Z",
  },
  {
    id: "bed7330f-2cc0-4707-8932-6bc625a9f7fe",
    company: "首都客運",
    dept: "資訊中心",
    has_reported: true,
    reported_at: "2025-05-20T14:15:00.000Z",
    user_id: "U75e1554845bd81cba2151682ee99363d",
    groupCode: "營收訊息通報",
    message:
      "【營收訊息通報】 \n\n 114/04/14\n [訊息測試]\n LineMsg新環境 🚌🚌🚌",
    status: "成功",
    sendAt: "2025-05-20 14:01",
    createdAt: "2025-05-20T06:01:27.213Z",
  },
  {
    id: "11d001a4-8bf7-42c9-ae1a-e1d5641fcb40",
    company: "首都客運",
    dept: "資訊中心",
    has_reported: true,
    reported_at: "2025-05-20T14:15:00.000Z",
    user_id: "U75e1554845bd81cba2151682ee99363d",
    groupCode: "營收訊息通報",
    message:
      "【營收訊息通報】 \n\n 114/04/14\n [訊息測試]\n LineMsg新環境 🚌🚌🚌",
    status: "成功",
    sendAt: "2025-05-20 14:02",
    createdAt: "2025-05-20T06:02:59.263Z",
  },
  {
    id: "bac377d6-36c0-4147-9676-a41e37022798",
    company: "首都客運",
    dept: "資訊中心",
    has_reported: true,
    reported_at: "2025-05-20T14:15:00.000Z",
    user_id: "U75e1554845bd81cba2151682ee99363d",
    groupCode: "營收訊息通報",
    message:
      "【營收訊息通報】 \n\n 114/04/14\n [訊息測試]\n LineMsg新環境 🚌🚌🚌",
    status: "成功",
    sendAt: "2025-05-20 14:14",
    createdAt: "2025-05-20T06:14:55.777Z",
  },
  {
    id: "ed3ba8f4-1ac2-496b-80d2-252cf8874f26",
    company: "臺北客運",
    dept: "資訊中心",
    has_reported: true,
    reported_at: "2025-05-20T14:17:00.000Z",
    user_id: "U71a5a5954c9a6cdb0f40cefce0eaafa4",
    groupCode: "營收訊息通報",
    message:
      "【營收訊息通報】 \n\n 114/05/16\n [訊息測試]\n LineMsg 群發回報測試",
    status: "成功",
    sendAt: "2025-05-20 11:48",
    createdAt: "2025-05-20T03:48:27.201Z",
  },
  {
    id: "89169c35-e8d1-49c4-a2ed-6e8eba66c042",
    company: "臺北客運",
    dept: "資訊中心",
    has_reported: true,
    reported_at: "2025-05-20T14:17:00.000Z",
    user_id: "U71a5a5954c9a6cdb0f40cefce0eaafa4",
    groupCode: "營收訊息通報",
    message:
      "【營收訊息通報】 \n\n 114/05/16\n [訊息測試]\n LineMsg 群發回報測試",
    status: "成功",
    sendAt: "2025-05-20 11:48",
    createdAt: "2025-05-20T03:48:53.147Z",
  },
  {
    id: "f163c8f1-ec4a-4622-9c92-0948413d8748",
    company: "臺北客運",
    dept: "資訊中心",
    has_reported: true,
    reported_at: "2025-05-20T14:17:00.000Z",
    user_id: "U71a5a5954c9a6cdb0f40cefce0eaafa4",
    groupCode: "營收訊息通報",
    message:
      "【營收訊息通報】 \n\n 114/04/14\n [訊息測試]\n LineMsg新環境 🚌🚌🚌",
    status: "成功",
    sendAt: "2025-05-20 14:01",
    createdAt: "2025-05-20T06:01:26.448Z",
  },
  {
    id: "c57907f9-10aa-4462-b4f2-92b3038543fc",
    company: "臺北客運",
    dept: "資訊中心",
    has_reported: true,
    reported_at: "2025-05-20T14:17:00.000Z",
    user_id: "U71a5a5954c9a6cdb0f40cefce0eaafa4",
    groupCode: "營收訊息通報",
    message:
      "【營收訊息通報】 \n\n 114/04/14\n [訊息測試]\n LineMsg新環境 🚌🚌🚌",
    status: "成功",
    sendAt: "2025-05-20 14:02",
    createdAt: "2025-05-20T06:02:58.651Z",
  },
  {
    id: "e70adcbb-5600-4017-b32d-aa53dd380e07",
    company: "臺北客運",
    dept: "資訊中心",
    has_reported: true,
    reported_at: "2025-05-20T14:17:00.000Z",
    user_id: "U71a5a5954c9a6cdb0f40cefce0eaafa4",
    groupCode: "營收訊息通報",
    message:
      "【營收訊息通報】 \n\n 114/04/14\n [訊息測試]\n LineMsg新環境 🚌🚌🚌",
    status: "成功",
    sendAt: "2025-05-20 14:09",
    createdAt: "2025-05-20T06:09:17.000Z",
  },
];
