import { Divider } from "@/src/components/divider";
import { Heading } from "@/src/components/heading";
import { InputGroup } from "@/src/components/input";
import { getEvents } from "@/src/data";
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import type { Metadata } from "next";
import Link from "next/link";
import { Input } from "../../../components/input";

export const metadata: Metadata = {
  title: "Summaries",
};

export default async function Events() {
  const events = getEvents();

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-sm:w-full sm:flex-1">
          <Heading>Summaries</Heading>
          <div className="mt-4 flex max-w-xl gap-4">
            <div className="flex-1">
              <InputGroup>
                <MagnifyingGlassIcon />
                <Input name="search" placeholder="Search summaries&hellip;" />
              </InputGroup>
            </div>
          </div>
        </div>
      </div>
      <ul className="mt-10">
        {events.map((event, index) => (
          <>
            <li key={event.id}>
              <Divider soft={index > 0} />
              <div className="flex items-center justify-between">
                <div key={event.id} className="flex gap-6 py-6">
                  <div className="space-y-1.5">
                    <div className="text-base/6 font-semibold">
                      <Link href={event.url}>May 9, 2024 - May 30, 2024</Link>
                    </div>
                    <div className="font-normal text-zinc-300">
                      Would it be helpful to add a detailed doc block explaining
                      that the user should pass one of the public origin
                      constants to this function? detailed doc block explaining
                      ...
                    </div>
                    <div className="text-xs/6 text-zinc-600">[15] insights</div>
                  </div>
                </div>
              </div>
            </li>
          </>
        ))}
      </ul>
    </>
  );
}
