"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useState } from "react";

type ConfirmSendDialogProps = {
  onConfirm: () => void;
};

export const ConfirmSendDialog = ({ onConfirm }: ConfirmSendDialogProps) => {
  const [open, setOpen] = useState(false);

  const handleConfirm = () => {
    onConfirm(); // 執行傳入的邏輯
    setOpen(false); // 關閉 Dialog
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="sm"
          onClick={() => {}}
          className=" text-white-pure text-sm  ring-black-main border-1 ring-2 border-black-main font-bold hover:bg-white-pure hover:text-black-main"
          variant="secondary"
        >
          一鍵發送
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>確認發送</DialogTitle>
          <DialogDescription>
            您確定要將訊息發送給所有對象嗎？
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            取消
          </Button>
          <Button onClick={handleConfirm}>確認發送</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
