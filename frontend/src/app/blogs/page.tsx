import { LandingImageWithContent } from "@/components";
import { Text } from "@/components/ui";
import React from "react";

const BlogsPage = () => {
  return (
    <div>
      <LandingImageWithContent
        variant="text"
        heading="Blogs"
        subheading="Student Welfare Committee"
        backgroundImage="/vit-chennai-entrance.png"
      />
      <div id="scroll-to-component" className="h-screen">
        <Text>Blogs appear here</Text>
      </div>
    </div>
  );
};

export default BlogsPage;
