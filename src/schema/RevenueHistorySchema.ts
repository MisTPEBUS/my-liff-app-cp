// schemas.ts
import { z } from "zod";

export const RevenueHistorySchema = z.object({
  id: z.string().uuid(),
  company: z.string(),
  dept: z.string(),
  has_reported: z.boolean(),
  reported_at: z.string().nullable(),
  user_id: z.string(),
  groupCode: z.string(),
  message: z.string(),
  status: z.enum(["成功", "失敗"]),
  sendAt: z.string(),
  createdAt: z.string(),
});

export const MsgRecordsSchema = z.array(RevenueHistorySchema);

export type MsgRecordsType = z.infer<typeof MsgRecordsSchema>;
