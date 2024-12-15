import { toast } from "@/hooks/use-toast"

export const successToast = (text) => {
    toast({
        variant: "default",
        title: "Success",
        description: text,
    })
}
export const failedToast = (text) => {
    toast({
        variant: "destructive",
        title: "Failed",
        description: text,
    })
}