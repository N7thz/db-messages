import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card"

export const ContactInterativeListRow = ({
    row: {
        title,
        description
    }
}: {
    row: {
        id: string;
        title: string;
        description?: string | undefined
    }
}) => {
    return (
        <div className="bg-transparent">
            <Button
                variant="outline"
                className="flex flex-col size-full whitespace-normal"
            >
                {title}
                {
                    description && (
                        <CardDescription>
                            {description}
                        </CardDescription>
                    )
                }
            </Button>
        </div>
    )
}
