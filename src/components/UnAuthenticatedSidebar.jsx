"use client"

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import Link from "next/link"
import UpliftCard from "./UpliftCard"

export function UnAuthenticatedSidebar() {
  return (
    <div className="sticky top-20">
      <ul style={{ display: "grid", gap: "10px" }}>
        <li>
          <Card>
            <CardHeader>
              <CardTitle className="text-center text-xl font-semibold">Welcome Back!</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground mb-4">
                Login to access your profile and connect with others.
              </p>
              <Button className="w-full" variant="outline">
                <Link href="/signin">Login</Link>
              </Button>
              <Button className="w-full mt-2" variant="default">
                <Link href="/signup">Sign Up</Link>
              </Button>
            </CardContent>
          </Card>
        </li>
        {/* Gemini Uplift Card */}
        <li>
          <Card>
            <CardContent className="pt-6">
              <UpliftCard />
            </CardContent>
          </Card>
        </li>
      </ul>

    </div>
  )
}
