import { toast } from "@/hooks/use-toast"

export const successToast = (text, desc = "Proses berhasil dilakukan") => {
    toast({
        variant: "default",
        title: text,
        description: desc,
    })
}
export const failedToast = (text, desc = "Proses gagal dilakukan") => {
    toast({
        variant: "destructive",
        title: text,
        description: desc,
    })
}