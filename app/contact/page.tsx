import Breadcrumb from "@/components/Common/Breadcrumb";
import Contact from "@/components/Contact";

const ContactPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="Contact Page"
        bottomMargin={1}
      />

      <Contact />
    </>
  );
};

export default ContactPage;
