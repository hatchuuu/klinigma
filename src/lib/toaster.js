import { toast } from "@/hooks/use-toast"

export const successToast = (text = "Berhasil dilakukan") => {
    toast({
        variant: "default",
        title: "Success",
        description: text,
    })
}
export const failedToast = (text = "Gagal dilakukan") => {
    toast({
        variant: "destructive",
        title: "Failed",
        description: text,
    })
}