"use client";

import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

import Section from "@/components/shared/Section/Index";
import Heading from "@/components/shared/Typography/Heading";
import Label from "@/components/shared/Typography/Label";
import Subtitle from "@/components/shared/Typography/Subtitle";
import InlineLink from "@/components/shared/InlineLink/Index";
import Card from "@/components/shared/Card/Index";
import Icon from "@/components/shared/GetSvg/Index";

import { HomeBlogPosts } from "@/server/helpers/types/data-types";
import { Home } from "@/helpers/constants/query-keys";
import { fetchHomePage } from "@/server/helpers/utils/fetch-data/fetch-page";
import { calendar, pen } from "@/helpers/constants/icons";

const LatestBlog = () => {
  const { data, isPending, isError, error } = useQuery({
    queryKey: [Home.LatestBlog],
    queryFn: () => fetchHomePage("latestBlog"),
  });

  const blogPosts = getBlogPosts(data);

  return (
    <Section className="flex flex-col gap-[72px] my-[100px]">
      <Heading variant="secondary" className="text-center">
        Latest Blog
      </Heading>

      {isPending && <p className="text-center">Loading latest blog posts...</p>}

      {isError && <p className="text-center">Error occured! {error.message}</p>}

      {data && <div className="flex gap-8">{blogPosts}</div>}
    </Section>
  );
};

const getBlogPosts = (data?: HomeBlogPosts) =>
  data?.map(
    ({ id, author, timestamp, title, description, img: { src, alt } }) => {
      const date = new Date(timestamp).toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });

      return (
        <Card
          key={id}
          el="article"
          tabIndex={0}
          className="hocus:-translate-y-6 duration-500"
        >
          <Image
            src={src}
            alt={alt}
            height={255}
            width={416}
            className="rounded-lg"
          />

          <div className="flex flex-col gap-4 pt-4 px-4 pb-8 text-grey-3">
            <div className="flex gap-16 mb-2">
              <Label
                variant="sm"
                el="p"
                className="flex items-center gap-2 capitalize"
              >
                <Icon id={pen} />
                {author}
              </Label>
              <Label variant="sm" el="p" className="flex items-center gap-2">
                <Icon id={calendar} />
                {date}
              </Label>
            </div>

            <Subtitle variant="quaternary" el="h3" className="text-black">
              {title}
            </Subtitle>

            <p className="text-balance">{description}</p>

            <InlineLink
              className="mt-4 self-start text-primary"
              variant="primaryLight"
              href={`/blog/${id}`}
            >
              <Label variant="bold" el="span">
                Read More
              </Label>
            </InlineLink>
          </div>
        </Card>
      );
    }
  );

export default LatestBlog;
