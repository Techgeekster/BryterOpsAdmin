using Microsoft.AspNetCore.Mvc;
using System;
using System.Text;

namespace BryterOps_Library
{
    /// <summary>
    /// Summary description for JSON
    /// </summary>
    public static class JSON
    {
        public static IActionResult Success(object data)
        {
            return new JsonResult(new
            {
                Success = true,
                Data = data
            });
        }

        public static IActionResult Success()
        {
            return new JsonResult(new
            {
                Success = true
            });
        }

        public static IActionResult Error(string message)
        {
            return new JsonResult(new
            {
                Success = false,
                Message = message
            });
        }

        public static IActionResult Error()
        {
            return Error("An Error has occurred");
        }

        public static IActionResult Error(Exception exception)
        {
            StringBuilder builder = new StringBuilder();

            builder.AppendLine("Error occured. Please copy and paste the following information and give it to a developer.");
            builder.AppendLine("");

            builder.AppendLine(exception.Message);
            builder.AppendLine(exception.StackTrace);

            if (exception.InnerException != null)
            {
                builder.AppendLine(exception.InnerException.Message);
                builder.AppendLine(exception.InnerException.StackTrace);
            }

            return Error(builder.ToString());
        }
    }
}