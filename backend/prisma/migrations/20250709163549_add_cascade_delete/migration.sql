-- DropForeignKey
ALTER TABLE "ResumeData" DROP CONSTRAINT "ResumeData_userId_fkey";

-- DropForeignKey
ALTER TABLE "ResumeExperience" DROP CONSTRAINT "ResumeExperience_sectionId_fkey";

-- DropForeignKey
ALTER TABLE "ResumeSection" DROP CONSTRAINT "ResumeSection_resumeDataId_fkey";

-- AddForeignKey
ALTER TABLE "ResumeData" ADD CONSTRAINT "ResumeData_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserData"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResumeSection" ADD CONSTRAINT "ResumeSection_resumeDataId_fkey" FOREIGN KEY ("resumeDataId") REFERENCES "ResumeData"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResumeExperience" ADD CONSTRAINT "ResumeExperience_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "ResumeSection"("id") ON DELETE CASCADE ON UPDATE CASCADE;
