import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();
    const query = (prompt || "").toLowerCase();

    let reply = "I've logged your request into the Campus Memory system. Check your active timeline or radar for updates.";

    // Contextual intelligence matching
    if (query.includes("free") || query.includes("time") || query.includes("schedule")) {
      reply = "You have a 45-minute window before Data Structures (CS201). Recommended: Lab 4 for AI Society Hack-Meet.";
    } else if (query.includes("react") || query.includes("frontend") || query.includes("developer")) {
      reply = "Peer Match radar found 3 students in your batch currently working with React and Next.js. Check the Peer Match modal!";
    } else if (query.includes("hackathon") || query.includes("code") || query.includes("event")) {
      reply = "Hackathon season is active! 3 tech societies have posted openings. Check the Campus Pulse modal for details.";
    } else if (query.includes("curfew") || query.includes("hostel") || query.includes("rule")) {
      reply = "Hostel curfew notice shift detected: Extended by 1 hour during exam weeks per official circular #402.";
    } else if (query.includes("exam") || query.includes("grade") || query.includes("cgpa")) {
      reply = "Your current trajectory points to a strong semester finish. Use the Grade Predictor to model your finals scenarios.";
    } else if (query.includes("coffee") || query.includes("hangout") || query.includes("food")) {
      reply = "Serendipity Engine suggests: Grab iced coffee at the Tech Quad canteen—3 classmates from your CS section are currently there.";
    }

    return NextResponse.json({ reply });
  } catch (error) {
    return NextResponse.json(
      { reply: "Error processing your request through Campus Copilot." },
      { status: 500 }
    );
  }
}
