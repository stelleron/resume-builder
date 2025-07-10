-- CreateTable
CREATE TABLE "UserData" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "UserData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResumeData" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "github" TEXT NOT NULL,
    "linkedin" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "ResumeData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResumeSection" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "visible" BOOLEAN NOT NULL DEFAULT true,
    "resumeDataId" INTEGER NOT NULL,

    CONSTRAINT "ResumeSection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ResumeExperience" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "subTitle" TEXT NOT NULL,
    "timePeriod" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "bulletPoints" TEXT[],
    "visible" BOOLEAN NOT NULL DEFAULT true,
    "sectionId" INTEGER NOT NULL,

    CONSTRAINT "ResumeExperience_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserData_username_key" ON "UserData"("username");

-- CreateIndex
CREATE UNIQUE INDEX "ResumeData_userId_key" ON "ResumeData"("userId");

-- AddForeignKey
ALTER TABLE "ResumeData" ADD CONSTRAINT "ResumeData_userId_fkey" FOREIGN KEY ("userId") REFERENCES "UserData"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResumeSection" ADD CONSTRAINT "ResumeSection_resumeDataId_fkey" FOREIGN KEY ("resumeDataId") REFERENCES "ResumeData"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ResumeExperience" ADD CONSTRAINT "ResumeExperience_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "ResumeSection"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
