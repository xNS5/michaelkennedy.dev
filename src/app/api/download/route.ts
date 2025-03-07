import {getDocument} from "@/db/db";
import { NextResponse } from "next/server";
import type {Config} from "@/types/config";

export async function GET() {
    const { resume: { resume_pdf_url} }: Config = await getDocument<Config>("config", "config");
    const diff = resume_pdf_url.length - 25;

    try {
        const response = await fetch(resume_pdf_url);

        if (!response.ok) {
            return NextResponse.json({ error: "Failed to fetch file" }, { status: 500 });
        }

        const fileBuffer = await response.arrayBuffer();

        return new NextResponse(fileBuffer, {
            status: 200,
            headers: {
                "Content-Type": "application/pdf",
                "Content-Disposition": `attachment; filename=${resume_pdf_url.substring(diff, resume_pdf_url.length)}`,
            },
        });
    } catch (error) {
        return NextResponse.json({ error: "Error fetching file" }, { status: 500 });
    }
}
